import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportPatchlistPdf = (stageName, nodes, edges) => {
    const doc = new jsPDF();
    const timestamp = new Date().toLocaleString();

    doc.setFontSize(18);
    doc.text(`Patchlist: ${stageName || 'Unnamed Stage'}`, 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated on: ${timestamp}`, 14, 28);

    const generateTable = (title, targetTypes, yPos) => {
        const relevantEdges = edges.filter(edge => {
            const targetNode = nodes.find(n => n.id === edge.target);
            return targetNode && targetTypes.includes(targetNode.type);
        });

        if (relevantEdges.length === 0) return yPos;

        doc.setFontSize(14);
        doc.text(title, 14, yPos);

        const tableData = relevantEdges.map(edge => {
            const sourceNode = nodes.find(n => n.id === edge.source);
            const targetNode = nodes.find(n => n.id === edge.target);
            return [
                sourceNode?.data?.label || sourceNode?.type || 'Unknown',
                targetNode?.data?.label || targetNode?.type || 'Unknown',
                edge.sourceHandle || 'Default',
                edge.targetHandle || 'Default',
                edge.type?.toUpperCase() || 'AUDIO'
            ];
        });

        autoTable(doc, {
            startY: yPos + 5,
            head: [['Source', 'Target Device', 'Out Port', 'In Port', 'Type']],
            body: tableData,
            theme: 'striped',
            headStyles: { fillColor: [40, 40, 40] },
            margin: { left: 14 }
        });

        return doc.lastAutoTable.finalY + 15;
    };

    let currentY = 40;
    currentY = generateTable('Stagebox Patching', ['stagebox'], currentY);
    currentY = generateTable('Mixer Patching', ['mixer'], currentY);
    currentY = generateTable('DI-Box Patching', ['di', 'di800'], currentY);

    doc.save(`Patchlist_${(stageName || 'stage').replace(/\s+/g, '_')}.pdf`);
};