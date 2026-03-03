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

            // Header
            addHeader(document, stage);

            // Section 1: Equipment Inventory
            document.add(new Paragraph("1. Equipment Inventory", new Font(Font.HELVETICA, 14, Font.BOLD)));
            document.add(new Paragraph(" "));
            addEquipmentTable(document, stage);

            document.add(new Paragraph(" "));

            // Section 2: Patch List (Connections)
            document.add(new Paragraph("2. Patch List (Cabling)", new Font(Font.HELVETICA, 14, Font.BOLD)));
            document.add(new Paragraph(" "));
            addPatchListTable(document, stage);

            document.close();
            return out.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("PDF generation failed: " + e.getMessage());
        }
    }

    private void addHeader(Document document, Stage stage) throws DocumentException {
        Font titleFont = new Font(Font.HELVETICA, 18, Font.BOLD);
        document.add(new Paragraph("Stage Plot Report", titleFont));
        document.add(new Paragraph("Project: " + (stage.getName() != null ? stage.getName() : "Unnamed")));
        document.add(new Paragraph("Dimensions: " + stage.getWidthMeters() + "m x " + stage.getDepthMeters() + "m"));
        document.add(new Paragraph("--------------------------------------------------------------------------------------------------------------------------"));
        document.add(new Paragraph(" "));
    }

    private void addEquipmentTable(Document document, Stage stage) throws DocumentException {
        if (stage.getElements() == null || stage.getElements().isEmpty()) {
            document.add(new Paragraph("No equipment placed on stage."));
            return;
        }

        PdfPTable table = new PdfPTable(3);
        table.setWidthPercentage(100);
        table.setWidths(new float[]{3f, 3f, 4f});

        addHeaderCell(table, "Element");
        addHeaderCell(table, "Category");
        addHeaderCell(table, "Details");

        for (StageElement el : stage.getElements()) {
            table.addCell(el.getLabel() != null ? el.getLabel() : "Unnamed");
            table.addCell(el.getCategory() != null ? el.getCategory() : "N/A");

            String patch = (el.getConfiguration() != null && el.getConfiguration().containsKey("patchChannel"))
                    ? "CH: " + el.getConfiguration().get("patchChannel")
                    : "-";
            table.addCell(patch);
        }
        document.add(table);
    }

    private void addPatchListTable(Document document, Stage stage) throws DocumentException {
        if (stage.getConnections() == null || stage.getConnections().isEmpty()) {
            document.add(new Paragraph("No connections defined."));
            return;
        }

        PdfPTable table = new PdfPTable(4);
        table.setWidthPercentage(100);
        table.setWidths(new float[]{1f, 4f, 2f, 4f});

        addHeaderCell(table, "#");
        addHeaderCell(table, "From (Source)");
        addHeaderCell(table, "Signal");
        addHeaderCell(table, "To (Target)");

        Map<String, String> labels = stage.getElements().stream()
                .collect(Collectors.toMap(StageElement::getId, e -> e.getLabel() != null ? e.getLabel() : e.getId(), (a, b) -> a));

        int i = 1;
        for (Connection conn : stage.getConnections()) {
            table.addCell(String.valueOf(i++));
            table.addCell(labels.getOrDefault(conn.getSourceId(), "Unknown"));
            table.addCell(conn.getType() != null ? conn.getType().name() : "AUDIO");
            table.addCell(labels.getOrDefault(conn.getTargetId(), "Unknown"));
        }
        document.add(table);
    }

    private void addHeaderCell(PdfPTable table, String text) {
        PdfPCell cell = new PdfPCell(new Phrase(text, new Font(Font.HELVETICA, 12, Font.BOLD)));
        cell.setPadding(5);
        table.addCell(cell);
    }
}