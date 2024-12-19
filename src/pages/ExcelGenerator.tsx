import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { Button } from 'antd';

const ExcelGenerator = () => {
  const exportToExcel = async () => {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('教学进度表');

      // 设置列宽
      const columnWidths = [
        { key: 'A', width: 5.68 },
        { key: 'E', width: 20 },
        { key: 'F', width: 11 },
        { key: 'H', width: 18.06 },
      ];
      columnWidths.forEach(({ key, width }) => {
        worksheet.getColumn(key).width = width;
      });

      // 设置行高
      const rowHeights = {
        1: 72.75,
        2: 51.2,
        3: 78.75,
        4: 46.5,
        13: 30.4,
        17: 63.75,
        18: 250,
        23: 37.5,
        26: 24,
        27: 24,
        28: 24,
        29: 24,
        30: 24,
        31: 24,
        32: 24,
        33: 210,
        58: 30,
        59: 30,
      };
      Object.entries(rowHeights).forEach(([row, height]) => {
        worksheet.getRow(Number(row)).height = height;
      });

      // 动态生成单元格范围的辅助函数
      const generateRange = (startColumn: any, startRow: any, count: any, endColumn: any) =>
        Array.from(
          { length: count },
          (_, i) => `${startColumn}${startRow + i}:${endColumn}${startRow + i}`,
        );

      // 合并单元格
      const mergeCells = [
        ['A26:N26'],
        ['A27:N27', 'A28:N28'],
        ['A29:A31', 'B29:N31'],
        ['A32:N32'],
        ['A33:N33'],
        ['B59:D59'],
        ['B58:D58'],
        ['I58:M58'],
        ['I59:M59'],
        ...generateRange('E', 37, 21, 'I'), // E37:I55
        ...generateRange('J', 37, 21, 'K'), // J37:K55
        ...generateRange('L', 37, 21, 'M'), // L37:M55
      ];
      mergeCells.flat().forEach((range) => worksheet.mergeCells(range));

      // 添加标题
      const titles = [
        {
          text: '湖 北 文 理 学 院 教 育 学 院',
          font: { name: '华文行楷', size: 36, bold: true },
          row: 2,
        },
        { text: '课程教学进度计划表', font: { name: '华文新魏', size: 36, bold: true }, row: 3 },
        { text: '2024-2025学年上学期', font: { name: '仿宋', size: 18 }, row: 4 },
        { text: '填 表 说 明', font: { size: 21 }, row: 17 },
        { text: '教育学院制表', font: { name: '隶书', size: 21 }, row: 13 },
      ];
      titles.forEach(({ text, font, row }) => {
        worksheet.mergeCells(`A${row}:N${row}`);
        const cell = worksheet.getCell(`A${row}`);
        cell.value = text;
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.font = font;
      });

      // 添加填表说明
      const instructions = [
        '1．本表是教师授课的依据和学生课程学习的概要，也是学校和院（系、部）进行教学检查，评价课堂教学质量和考试命题的重要依据，任课教师应根据教学大纲和教学内容的要求认真填写，表中的基本信息和内容应填写完整，不得遗漏。',
        '2．基本信息中的“课程考核说明及要求”的内容主要包括课程考核的方式、成绩评定的方法、平时成绩与考试成绩的比例、考试的题型、考试时间以及其他相关问题的说明与要求等。',
        '3．进度表中的“教学形式及其手段”是指教学过程中教师所采用的各种教学形式及相关手段的说明，一般包括讲授、多媒体教学、课件演示、练习、实验、讨论、案例等。',
        '4．进度表中的“执行情况”主要填写计划落实和变更情况。',
        '5．教学进度计划表经系（中心）领导、院教学领导审签后，不得随意变动，如需调整，应经系（中心）和院主管领导同意，并在执行情况栏中注明。',
        '6．本表一式两份份，经审签后，任课教师、院（系）各留一份。',
        '7．非理论课教学的课程，可依此样式自行设计',
      ];
      worksheet.mergeCells('A18:N18');
      const instructionCell = worksheet.getCell('A18');
      instructionCell.value = instructions.join('\n');
      instructionCell.alignment = { vertical: 'top', horizontal: 'left', wrapText: true };
      instructionCell.font = { size: 14, name: 'Adobe 仿宋 Std R' };

      // 添加表格标题
      const tableTitle = [
        { title: '主讲教师', start: 'A23', end: 'D23' },
        { title: '课程名称(编号)', start: 'E23', end: 'E23' },
        { title: '授课对象', start: 'F23', end: 'I23' },
        { title: '学时分配', start: 'J23', end: 'N23' },
        { title: '校历周次', start: 'A35', end: 'A36', border: 'thin' },
        { title: '学时数', start: 'B35', end: 'D35', border: 'thin' },
        { title: '教学内容安排', start: 'E35', end: 'I36', border: 'thin' },
        { title: '教学形式及手段', start: 'J35', end: 'K36', border: 'thin' },
        { title: '作业或辅导安排', start: 'L35', end: 'M36', border: 'thin' },
        { title: '执行情况', start: 'N35', end: 'N36', border: 'thin' },
        { title: '理论', start: 'B36', end: 'B36', border: 'thin' },
        { title: '实验', start: 'C36', end: 'C36', border: 'thin' },
        { title: '-', start: 'D36', end: 'D36', border: 'thin' },
      ];
      tableTitle.forEach(({ title, start, end, border }) => {
        worksheet.mergeCells(start, end);
        const cell = worksheet.getCell(start);
        cell.value = title;
        cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        cell.font = { size: 12 };
        cell.border = {
          top: { style: (border as ExcelJS.BorderStyle) || 'medium' },
          left: { style: (border as ExcelJS.BorderStyle) || 'medium' },
          bottom: { style: (border as ExcelJS.BorderStyle) || 'medium' },
          right: { style: (border as ExcelJS.BorderStyle) || 'medium' },
        };
      });

      // 填充表格数据
      const tableDataOne = [
        [
          '姓名',
          '职称',
          '学历',
          '学位',
          '现代教育技术',
          '专业',
          '年级',
          '班级',
          '人数',
          '总学时',
          '授课',
          '实验',
          '课外',
          '其他',
        ],
        [
          '童童',
          '副教授',
          '本科',
          '硕士',
          '15403',
          '地理科学',
          '2022',
          '地理科学2213',
          '51',
          '32',
          '16',
          '16',
          '',
          '',
        ],
        ['教材名称：《现代教育技术》 编著者：傅钢善 出版社：高等教育出版社 出版时间：2016'],
        ['主要参考书（编著者、名称、出版社、出版时间）：'],
        ['《现代教育技术教程》，雷体南，华中科技大学出版社，2016.7'],
        [
          '学时分配使用',
          '本课程教学采用讲练结合的方式进行，教学安排在多媒体教室，实验安排在计算机基础实验室。',
        ],
        ['课程考核说明及要求：'],
        [
          `
          成绩组成（平时成绩占60%，期末考核成绩占40%）。平时成绩由线下学习活动成绩（35%）和线上学习活动成绩（25%）组成。线下学习活动成绩由课堂出勤（5%）、作业（10%）、实践作品（20%）组成；线上学习活动成绩由在线课程视频（10%）、章节测验（10%）、在线讨论（5%）组成。
          1、课堂出勤按照出勤率计算成绩，满分5分。
          2、作业（含实践作品）分为普通作业、互评作业和小组作业，每次作业按照单项百分制评分，总成绩计算时取作业平均分，按照30%加权后得到最终作业成绩，满分30分。
          3、课程视频设置闯关任务点，使用防拖拽和焦点锁定技术，要求学生完整观看完视频计满分，否则按完成比例计分，满分10分。
          4、章节测验得分由学生在线测试，满分10分。
          5、在线讨论采用积分制，发表一个学术话题积5积分，回复一个学术话题积2积分，获得一个赞积1积分，积分100分计满分5分。
          6、期末考核采取从系统题库随机抽题组卷的方式进行，包括侧重知识层面考核的客观题和侧重能力与反思层面的主观题，采用上机考核方式进行，考核按百分制评分，期末考核成绩为得分乘以40%的加权系数，满分40分。
          `,
        ],
      ];

      const setCellProperties = (cell: any, value: any, alignment: any, border: any) => {
        cell.value = value;
        if (alignment) cell.alignment = alignment;
        if (border) cell.border = border;
      };

      tableDataOne.forEach((row, rowIndex) => {
        const startRow = 24 + rowIndex;
        row.forEach((value, colIndex) => {
          const cellAddress = String.fromCharCode(65 + colIndex) + startRow;
          const cell = worksheet.getCell(cellAddress);
          if (rowIndex <= 2) {
            setCellProperties(
              cell,
              value,
              { vertical: 'middle', horizontal: 'center', wrapText: true },
              {
                top: { style: 'medium' },
                left: { style: 'medium' },
                bottom: { style: 'medium' },
                right: { style: 'medium' },
              },
            );
          } else if (rowIndex === 3 || rowIndex === 4) {
            setCellProperties(
              cell,
              value,
              { vertical: 'middle', horizontal: 'left', wrapText: true },
              {
                right: { style: 'medium' },
                bottom: rowIndex === 4 ? { style: 'thin' } : undefined,
              },
            );
          } else if (rowIndex === 5) {
            setCellProperties(
              cell,
              value,
              {
                vertical: 'middle',
                wrapText: true,
                horizontal: colIndex === 1 ? 'center' : undefined,
              },
              {
                right: colIndex === 1 ? { style: 'medium' } : { style: 'thin' },
              },
            );
          } else if (rowIndex === 6 || rowIndex === 7) {
            const specialCellAddress = rowIndex === 6 ? 'A32' : 'A33';
            const specialCell = worksheet.getCell(specialCellAddress);
            setCellProperties(
              specialCell,
              value,
              { vertical: 'middle', wrapText: true },
              {
                top: rowIndex === 6 ? { style: 'medium' } : undefined,
                right: { style: 'medium' },
                bottom: rowIndex === 7 ? { style: 'thin' } : undefined,
              },
            );
          }
        });
      });

      const tableDataTwo = [
        [1, 2, '', '', '课程介绍、教育技术概述、教育信息化与现代教育技术', '讨论', '', ''],
        [1, 2, '', '', '课程介绍、教育技术概述、教育信息化与现代教育技术', '讨论', '', ''],
        [1, 2, '', '', '课程介绍、教育技术概述、教育信息化与现代教育技术', '讨论', '', ''],
        [1, 2, '', '', '课程介绍、教育技术概述、教育信息化与现代教育技术', '讨论', '', ''],
        [1, 2, '', '', '课程介绍、教育技术概述、教育信息化与现代教育技术', '讨论', '', ''],
        [1, 2, '', '', '课程介绍、教育技术概述、教育信息化与现代教育技术', '讨论', '', ''],
        [1, 2, '', '', '课程介绍、教育技术概述、教育信息化与现代教育技术', '讨论', '', ''],
        [1, 2, '', '', '课程介绍、教育技术概述、教育信息化与现代教育技术', '讨论', '', ''],
        [1, 2, '', '', '课程介绍、教育技术概述、教育信息化与现代教育技术', '讨论', '', ''],
        [1, 2, '', '', '课程介绍、教育技术概述、教育信息化与现代教育技术', '讨论', '', ''],
        [1, 2, '', '', '课程介绍、教育技术概述、教育信息化与现代教育技术', '讨论', '', ''],
        [1, 2, '', '', '课程介绍、教育技术概述、教育信息化与现代教育技术', '讨论', '', ''],
        [1, 2, '', '', '课程介绍、教育技术概述、教育信息化与现代教育技术', '讨论', '', ''],
        [1, 2, '', '', '课程介绍、教育技术概述、教育信息化与现代教育技术', '讨论', '', ''],
        [1, 2, '', '', '课程介绍、教育技术概述、教育信息化与现代教育技术', '讨论', '', ''],
        [1, 2, '', '', '课程介绍、教育技术概述、教育信息化与现代教育技术', '讨论', '', ''],
        [1, 2, '', '', '课程介绍、教育技术概述、教育信息化与现代教育技术', '讨论', '', ''],
        [1, 2, '', '', '课程介绍、教育技术概述、教育信息化与现代教育技术', '讨论', '', ''],
        [1, 2, '', '', '课程介绍、教育技术概述、教育信息化与现代教育技术', '讨论', '', ''],
        [1, 2, '', '', '课程介绍、教育技术概述、教育信息化与现代教育技术', '讨论', '', ''],
        [1, 2, '', '', '课程介绍、教育技术概述、教育信息化与现代教育技术', '讨论', '', ''],
      ];

      tableDataTwo.forEach((row, rowIndex) => {
        const startRow = 37 + rowIndex;
        row.forEach((value, colIndex) => {
          let cellAddress;
          if (colIndex === 4) {
            cellAddress = `E${startRow}`; // 合并的E:I
          } else if (colIndex === 5) {
            cellAddress = `J${startRow}`; // 合并的J:K
          } else if (colIndex === 6) {
            cellAddress = `L${startRow}`; // 合并的L:M
          } else if (colIndex === 7) {
            cellAddress = `N${startRow}`; // 单独的N
          } else {
            cellAddress = String.fromCharCode(65 + colIndex) + startRow;
          }
          const cell = worksheet.getCell(cellAddress);
          cell.value = value;
          cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
        });
      });

      // 填充数据
      worksheet.getCell('B58').value = '系中心主任（签字）：';
      worksheet.getCell('B59').value = '2024年8月25日';

      worksheet.getCell('I58').value = '院分管领导（签字）：____';
      worksheet.getCell('I59').value = '2024年8月25日';

      // 设置对齐方式
      ['B58', 'B59', 'I58', 'I59'].forEach((cellAddress) => {
        const cell = worksheet.getCell(cellAddress);
        cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
        cell.font = { size: 12 };
      });

      // 保存文件
      const buffer = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buffer]), '课程教学进度计划表.xlsx');
    } catch (error) {
      console.error('导出Excel时出错:', error);
    }
  };

  return (
    <div>
      <Button type="primary" onClick={exportToExcel}>
        导出Excel
      </Button>
    </div>
  );
};

export default ExcelGenerator;
