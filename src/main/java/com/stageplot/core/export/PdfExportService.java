package com.stageplot.core.export;

import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Font;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.stageplot.core.domain.Connection;
import com.stageplot.core.domain.Stage;
import com.stageplot.core.domain.StageElement;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PdfExportService {

    public byte[] generatePdf(Stage stage) {
        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Document document = new Document();
            PdfWriter.getInstance(document, out);
            document.open();

            addHeader(document, stage);
            document.add(new Paragraph(" "));
            addPatchListTable(document, stage);

            document.close();
            return out.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("PDF generation failed", e);
        }
    }

    private void addHeader(Document document, Stage stage) throws DocumentException {
        Font titleFont = new Font(Font.HELVETICA, 18, Font.BOLD);
        document.add(new Paragraph("Stage Plot: " + stage.getName(), titleFont));
        document.add(new Paragraph("Dimensions: " + stage.getWidthMeters() + "m x " + stage.getDepthMeters() + "m"));
        document.add(new Paragraph(" "));
    }

    private void addPatchListTable(Document document, Stage stage) throws DocumentException {
        PdfPTable table = new PdfPTable(4);
        table.setWidthPercentage(100);
        table.setWidths(new float[]{1f, 3f, 2f, 3f});

        addTableHeader(table);
        addTableRows(table, stage);

        document.add(table);
    }

    private void addTableHeader(PdfPTable table) {
        Font headerFont = new Font(Font.HELVETICA, 12, Font.BOLD);

        PdfPCell cell1 = new PdfPCell(new Phrase("CH / ID", headerFont));
        PdfPCell cell2 = new PdfPCell(new Phrase("Source", headerFont));
        PdfPCell cell3 = new PdfPCell(new Phrase("Type", headerFont));
        PdfPCell cell4 = new PdfPCell(new Phrase("Target", headerFont));

        table.addCell(cell1);
        table.addCell(cell2);
        table.addCell(cell3);
        table.addCell(cell4);
    }

    private void addTableRows(PdfPTable table, Stage stage) {
        Map<String, String> elementLabels = stage.getElements().stream()
                .collect(Collectors.toMap(
                        StageElement::getId,
                        StageElement::getLabel,
                        (existing, replacement) -> existing
                ));

        int index = 1;
        for (Connection conn : stage.getConnections()) {
            String sourceName = elementLabels.getOrDefault(conn.getSourceId(), conn.getSourceId());
            String targetName = elementLabels.getOrDefault(conn.getTargetId(), conn.getTargetId());
            String type = conn.getType() != null ? conn.getType().name() : "UNKNOWN";

            table.addCell(String.valueOf(index++));
            table.addCell(sourceName);
            table.addCell(type);
            table.addCell(targetName);
        }
    }
}