import React, { useEffect, useState } from 'react';
import { List, Avatar, Typography, Space, Tooltip, Tag, message } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { Course } from './type';
import { getCurrentCourseList } from '@/services/course';
const { Text } = Typography;

const OngoingCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [imageUrls, setImageUrls] = useState<{ [key: number]: string }>({});

  // 分割文本为适应画布的行
  const getLinesForText = (text: string, ctx: CanvasRenderingContext2D, maxWidth: number) => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';
    words.forEach((word) => {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const width = ctx.measureText(testLine).width;
      if (width <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    });

    if (currentLine) lines.push(currentLine);
    return lines;
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data }: any = await getCurrentCourseList();
        const { list } = data;
        setCourses(list);
        // 为每个课程生成图片
        list.forEach((course: any) => {
          // 创建 canvas 元素
          const canvas = document.createElement('canvas');
          canvas.width = 150; // 设置宽度
          canvas.height = 150; // 设置高度
          const ctx = canvas.getContext('2d');
          if (ctx) {
            // 设置灰色背景
            ctx.fillStyle = '#808080';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 设置文本样式
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 18px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'hanging';

            // 将课程名称分行，避免文字超出边界
            const lines = getLinesForText(course.courseName, ctx, canvas.width - 20);
            const lineHeight = 20;
            lines.forEach((line, index) => {
              ctx.fillText(
                line,
                canvas.width / 2,
                canvas.height / 2 + (index - lines.length / 2) * lineHeight,
              );
            });

            // 将 canvas 转换为图片 URL
            const dataUrl = canvas.toDataURL();
            setImageUrls((prev) => ({ ...prev, [course.id]: dataUrl }));
          }
        });
      } catch (error) {
        message.error('课程加载失败');
      } finally {
      }
    };

    fetchCourses();
  }, []);

  return (
    <List
      itemLayout="vertical"
      dataSource={courses}
      renderItem={(course) => (
        <List.Item
          key={course.id}
          style={{
            marginBottom: '20px',
            borderRadius: '10px',
            border: '1px solid #f0f0f0',
            padding: '20px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            backgroundColor: '#fff',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.05)')}
        >
          <List.Item.Meta
            avatar={
              <Avatar
                shape="square"
                size={80}
                src={imageUrls[course.id]}
                style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
              />
            }
            title={<Text strong>{course.courseName}</Text>}
            description={
              <Text type="secondary" ellipsis={true}>
                {course.assessmentRequirements}
              </Text>
            }
          />
          <Space direction="vertical" style={{ width: '100%' }}>
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <Tooltip title="课程代码">
                <FileTextOutlined style={{ marginRight: 5 }} />
                <Text>{course.courseCode}</Text>
              </Tooltip>
              <Tooltip title="学期">
                <Text>{course.semester}</Text>
              </Tooltip>
            </Space>
            <Space
              style={{
                width: '100%',
                justifyContent: 'space-between',
                marginBottom: 16,
                color: 'rgba(0,0,0,0.65)',
              }}
            >
              <Tooltip title="提交日期">
                <Text>{new Date(course.submissionDate).toLocaleDateString()}</Text>
              </Tooltip>
              <Tooltip title="所属部门">
                <Text>{course.department}</Text>
              </Tooltip>
            </Space>
            <Tag
              color="blue"
              style={{
                marginTop: '10px',
                alignSelf: 'flex-end',
                borderRadius: '12px',
              }}
            >
              {course.semester}
            </Tag>
          </Space>
        </List.Item>
      )}
    />
  );
};

export default OngoingCourses;
