package com.stageplot.core.export;

import com.lowagie.text.Document;
import com.lowagie.text.Font;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;
import com.stageplot.core.domain.Stage;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
public class PdfExportService {

    public byte[] generatePdf(Stage stage) {
        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Document document = new Document();
            PdfWriter.getInstance(document, out);
            document.open();

            Font titleFont = new Font(Font.HELVETICA, 18, Font.BOLD);
            document.add(new Paragraph("Stage Plot: " + stage.getName(), titleFont));
            document.add(new Paragraph("Dimensions: " + stage.getWidthMeters() + "m x " + stage.getDepthMeters() + "m"));
            document.add(new Paragraph("Total Elements: " + stage.getElements().size()));
            document.add(new Paragraph("Total Connections: " + stage.getConnections().size()));

            document.close();
            return out.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("PDF generation failed", e);
        }
    }
}