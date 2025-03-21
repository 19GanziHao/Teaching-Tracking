import React, { useEffect, useState } from 'react';
import { List, Avatar, Typography, Tooltip, Tag, message, Button } from 'antd';
import { Course } from './type';
import { getCurrentCourseList } from '@/services/course';
const { Text } = Typography;

const OngoingCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  //存储canvas生成的图片url
  const [imageUrls, setImageUrls] = useState<{ [key: number]: string }>({});

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
        list.forEach((course: any) => {
          const canvas = document.createElement('canvas');
          canvas.width = 150;
          canvas.height = 150;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = '#808080';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 20px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'hanging';
            const lines = getLinesForText(course.courseName, ctx, canvas.width - 20);
            const lineHeight = 20;
            lines.forEach((line, index) => {
              ctx.fillText(
                line,
                canvas.width / 2,
                canvas.height / 2 + (index - lines.length / 2) * lineHeight,
              );
            });
            const dataUrl = canvas.toDataURL();
            //根据当前课程的id，存储对应相应的url
            //{id:url}
            setImageUrls((prev) => ({ ...prev, [course.id]: dataUrl }));
          }
        });
      } catch (error) {
        message.error('课程加载失败');
      }
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <List
        itemLayout="vertical"
        dataSource={courses}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.05)')
            }
          >
            <Avatar
              shape="square"
              size={80}
              src={imageUrls[course.id]}
              style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
            />
            <div style={{ flex: 1, marginLeft: 20 }}>
              <Text strong style={{ fontSize: '16px' }}>
                {course.courseName}
              </Text>
              <div>
                <Tooltip title="学期">
                  <Tag color="blue" style={{ borderRadius: '12px', marginTop: '5px' }}>
                    {course.semester}
                  </Tag>
                </Tooltip>
                <Tooltip title="院系">
                  <Tag
                    color="green"
                    style={{ borderRadius: '12px', marginTop: '5px', marginLeft: '8px' }}
                  >
                    {course.department}
                  </Tag>
                </Tooltip>
              </div>
            </div>
            <Button type="primary">管理课程</Button>
          </List.Item>
        )}
      />
    </div>
  );
};

export default OngoingCourses;
