import { ProDescriptions } from '@ant-design/pro-components';
import { Modal, Skeleton, Table, Tag } from 'antd'; // 添加 Tag 导入
import type { CourseVo } from './types';

interface CourseDetailProps {
  open: boolean;
  onCancel: () => void;
  data: CourseVo;
}

export default function CourseDetail({ open, onCancel, data }: CourseDetailProps) {
  return (
    <Modal title="课程详情" open={open} onCancel={onCancel} footer={null} width={1200}>
      {Object.keys(data).length === 0 ? (
        <Skeleton active />
      ) : (
        <ProDescriptions<CourseVo>
          column={2}
          dataSource={data}
          columns={[
            {
              title: '课程名称',
              dataIndex: 'courseName',
            },
            {
              title: '课程编号',
              dataIndex: 'courseCode',
            },
            {
              title: '系(中心)',
              dataIndex: 'department',
            },
            {
              title: '学期',
              dataIndex: 'semester',
            },
            {
              title: '填表日期',
              dataIndex: 'submissionDate',
              valueType: 'date',
            },
            {
              title: '考核要求',
              dataIndex: 'assessmentRequirements',
              span: 2,
            },
            // 教师信息
            {
              title: '教师姓名',
              dataIndex: ['teacherInfo', 'teacherName'],
            },
            {
              title: '职称',
              dataIndex: ['teacherInfo', 'title'],
            },
            {
              title: '学历',
              dataIndex: ['teacherInfo', 'education'],
            },
            {
              title: '学位',
              dataIndex: ['teacherInfo', 'degree'],
            },
            // 班级信息
            {
              title: '专业',
              dataIndex: ['classInfo', 'major'],
            },
            {
              title: '年级',
              dataIndex: ['classInfo', 'grade'],
            },
            {
              title: '班级',
              dataIndex: ['classInfo', 'className'],
            },
            {
              title: '学生人数',
              dataIndex: ['classInfo', 'studentCount'],
            },
            // 学时分配
            {
              title: '总学时',
              dataIndex: ['hoursDistribution', 'totalHours'],
            },
            {
              title: '讲课学时',
              dataIndex: ['hoursDistribution', 'lectureHours'],
            },
            {
              title: '实验学时',
              dataIndex: ['hoursDistribution', 'labHours'],
            },
            {
              title: '课外学时',
              dataIndex: ['hoursDistribution', 'extracurricularHours'],
            },
            {
              title: '其他学时',
              dataIndex: ['hoursDistribution', 'otherHours'],
            },
            {
              title: '学时分配说明',
              dataIndex: ['hoursDistribution', 'hoursDistributionNotes'],
              span: 2,
            },
            // 教材信息
            {
              title: '教材名称',
              dataIndex: ['textbookInfo', 'textbookName'],
            },
            {
              title: '作者',
              dataIndex: ['textbookInfo', 'author'],
            },
            {
              title: '出版社',
              dataIndex: ['textbookInfo', 'publisher'],
            },
            {
              title: '出版日期',
              dataIndex: ['textbookInfo', 'publishDate'],
              valueType: 'date',
            },
            {
              title: '参考书目',
              dataIndex: ['textbookInfo', 'referencesBooks'],
              span: 2,
            },
            // 教学进度表
            {
              title: '教学进度',
              dataIndex: 'teachingSchedule',
              span: 2,
              render: (_, record) => (
                <Table
                  dataSource={record.teachingSchedule}
                  columns={[
                    {
                      title: '周次',
                      dataIndex: 'calendarWeek',
                      width: 70,
                      render: (text) => `第${text}周`,
                    },
                    {
                      title: '课时分配',
                      dataIndex: 'hours',
                      width: 180,
                      render: (_, record) => (
                        <>
                          理论：{record.theoreticalHours || 0} | 实验：
                          {record.experimentalHours || 0} | 课外：{record.extracurricularHours || 0}
                        </>
                      ),
                    },
                    {
                      title: '教学内容',
                      dataIndex: 'teachingContent',
                      width: 250,
                    },
                    {
                      title: '教学方法',
                      dataIndex: 'teachingMethods',
                      width: 180,
                    },
                    {
                      title: '作业安排',
                      dataIndex: 'homeworkArrangement',
                      width: 180,
                    },
                    {
                      title: '状态',
                      dataIndex: 'executionStatus',
                      width: 100,
                      render: (status) => {
                        let color = '';
                        switch (status) {
                          case '已完成':
                            color = 'success';
                            break;
                          case '进行中':
                            color = 'processing';
                            break;
                          case '未开始':
                            color = 'default';
                            break;
                          case '已取消':
                            color = 'error';
                            break;
                          default:
                            color = 'warning';
                        }
                        return <Tag color={color}>{status}</Tag>;
                      },
                    },
                    {
                      title: '备注',
                      dataIndex: 'remarks',
                      width: 150,
                    },
                  ]}
                  pagination={false}
                  size="small"
                  bordered
                  scroll={{ x: 'max-content' }}
                />
              ),
            },
          ]}
        />
      )}
    </Modal>
  );
}
