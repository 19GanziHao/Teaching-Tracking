import React from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const ExcelGenerator = () => {
  const generateExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("教学进度表");

    // 设置列宽
    worksheet.columns = [
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
    ];

    // 设置标题部分
    worksheet.mergeCells("A2:I2");
    const titleCell = worksheet.getCell("A2");
    titleCell.value = "湖 北 文 理 学 院 教 育 学 院";
    titleCell.font = { size: 16, bold: true };
    titleCell.alignment = { horizontal: "center", vertical: "middle" };

    worksheet.mergeCells("A3:I3");
    const subtitleCell = worksheet.getCell("A3");
    subtitleCell.value = "课程教学进度计划表";
    subtitleCell.font = { size: 14, bold: true };
    subtitleCell.alignment = { horizontal: "center", vertical: "middle" };

    worksheet.mergeCells("A4:I4");
    const termCell = worksheet.getCell("A4");
    termCell.value = "2024-2025学年上学期";
    termCell.font = { size: 12, italic: true };
    termCell.alignment = { horizontal: "center", vertical: "middle" };

    // 添加课程信息
    worksheet.getCell("E6").value = "课程名称：";
    worksheet.getCell("F6").value = "现代教育技术";

    worksheet.getCell("E7").value = "主讲教师：";
    worksheet.getCell("F7").value = "童雷";

    worksheet.getCell("E8").value = "系(中心)：";
    worksheet.getCell("F8").value = "教育技术学";

    worksheet.getCell("E9").value = "授课班级：";
    worksheet.getCell("F9").value = "音乐学2211";

    worksheet.getCell("E10").value = "填表日期：";
    worksheet.getCell("F10").value = "2024-08-25";

    // 设置表格边框和对齐方式
    const borderStyle = { style: "thin", color: { argb: "000000" } };
    ["E6", "F6", "E7", "F7", "E8", "F8", "E9", "F9", "E10", "F10"].forEach((cell) => {
      const currentCell = worksheet.getCell(cell);
      currentCell.border = {
        top: borderStyle,
        left: borderStyle,
        bottom: borderStyle,
        right: borderStyle,
      };
      currentCell.alignment = { horizontal: "left", vertical: "middle" };
    });

    // 保存 Excel 文件
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), "教学进度计划表.xlsx");
  };

  return (
    <div>
      <h1>Excel 模板生成器</h1>
      <button onClick={generateExcel}>生成并下载 Excel</button>
    </div>
  );
};

export default ExcelGenerator;