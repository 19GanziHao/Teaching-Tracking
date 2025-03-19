import { useEffect, useState } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Card, Col, Popconfirm, Row, Space, Spin, message } from 'antd';
import dayjs from 'dayjs';
import type { ProColumns } from '@ant-design/pro-components';
import type { CourseItem, CourseVo, IData } from './types';
import CourseDetail from './CourseDetail';
import CourseEdit from './CourseEdit';
import { deleteCourse, findCourse, findCourseById, updateCourse } from '@/services/course';

// 添加 LoadMore 组件  在最下面加了一个div元素 然后就监听div元素是否可见，因此去判断是否到底部了
// const LoadMore = ({ onLoadMore }: { onLoadMore: () => void }) => {
//   const loadMoreRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) {
//           onLoadMore();
//         }
//       },
//       { threshold: 0.1 },
//     );

//     if (loadMoreRef.current) {
//       observer.observe(loadMoreRef.current);
//     }

//     return () => observer.disconnect();
//   }, [onLoadMore]);

//   return <div ref={loadMoreRef} style={{ height: '20px' }} />;
// };

export default function SelectCourse() {
  const [selectedCourse, setSelectedCourse] = useState<CourseVo>({});
  const [detailVisible, setDetailVisible] = useState(false);
  // 添加编辑相关的状态
  const [editVisible, setEditVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseVo>({});
  const [pageNum, setPageNum] = useState(1);
  const [pageSize] = useState(10);
  const [searchParams, setSearchParams] = useState<Partial<CourseItem>>({});
  const [dataSource, setDataSource] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // 修改数据加载函数
  const loadData = async () => {
    try {
      setLoading(true);
      const resp = await findCourse<IData>({
        ...searchParams, // 添加搜索参数
        pageNum,
        pageSize,
      });

      if (pageNum === 1) {
        setDataSource(resp?.data?.list || []);
      } else {
        setDataSource((prev) => [...prev, ...(resp?.data?.list || [])]);
      }

      // 如果此时返回的数据量小于 pageSize，说明没有更多数据了
      setHasMore(resp?.data?.list.length === pageSize);
    } catch (error) {
      message.error('加载数据失败');
    } finally {
      setLoading(false);
    }
  };

  // 初始加载
  useEffect(() => {
    loadData();
  }, [pageNum, pageSize, searchParams]);

  const columns: ProColumns<CourseItem>[] = [
    {
      title: '课程名称',
      dataIndex: 'courseName',
    },
    {
      title: '课程编号',
      dataIndex: 'courseCode',
    },
    {
      title: '系(学院)',
      dataIndex: 'department',
    },
    {
      title: '学期',
      dataIndex: 'semester',
    },
    {
      title: '填表时间',
      dataIndex: 'submissionDate',
      valueType: 'dateRange', // 类似自定义render
    },
  ];

  // 处理详情展示逻辑
  const handleViewDetail = async (id: number) => {
    setDetailVisible(true);
    const resp = await findCourseById<CourseVo>(id);
    setSelectedCourse(resp.data || {});
  };

  // 添加编辑处理函数
  const handleEdit = async (id: number) => {
    setEditVisible(true);
    const resp = await findCourseById<CourseVo>(id);
    setEditingCourse(resp.data || {});
  };

  const handleEditSubmit = async (values: any) => {
    try {
      await updateCourse(editingCourse.id as number, values);
      message.success('更新成功');
      setEditVisible(false);
      setEditingCourse({});
    } catch (error) {
      message.error('更新失败');
    }
  };

  const handleConfirmCourse = async (id: number) => {
    try {
      await deleteCourse(id);
      message.success('确认成功');
      setDataSource(dataSource.filter((course) => course.id !== id));
    } catch (error) {
      message.error('确认失败');
    }
  };

  const renderCourseCards = (dataSource: CourseItem[]) => {
    return (
      <Row gutter={[16, 16]}>
        {dataSource.map((course) => (
          <Col xs={24} sm={12} md={8} lg={6} key={course.id}>
            <Card
              hoverable
              title={course.courseName}
              extra={
                <Space>
                  <Button type="link" onClick={() => handleViewDetail(course.id)}>
                    查看
                  </Button>
                  <Button type="link" onClick={() => handleEdit(course.id)}>
                    编辑
                  </Button>
                  <Popconfirm
                    title="删除课程"
                    description="您确定要删除课程吗?"
                    onConfirm={() => handleConfirmCourse(course.id)}
                    // onCancel={cancel}
                    // okText="Yes"
                    // cancelText="No"
                  >
                    <Button type="link" danger>
                      删除
                    </Button>
                  </Popconfirm>
                </Space>
              }
              style={{
                transition: 'all 0.3s ease',
              }}
              className="course-card"
            >
              <p>课程编号：{course.courseCode}</p>
              <p>系(学院)：{course.department}</p>
              <p>学期：{course.semester}</p>
              <p>填表日期：{dayjs(course.submissionDate).format('YYYY-MM-DD')}</p>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <PageContainer>
      <ProTable<CourseItem>
        columns={columns}
        onSubmit={(params) => {
          // 过滤空值
          const p = Object.entries(params).reduce((acc: any, [key, value]) => {
            if (value !== '') acc[key] = value;
            if (key === 'submissionDate') {
              acc[key] = value.toString();
            }
            return acc;
          }, {});
          setSearchParams(p);
          setPageNum(1);
        }}
        tableRender={() => (
          <>
            {renderCourseCards(dataSource)}
            {/* {hasMore && !loading && <LoadMore onLoadMore={() => setPageNum((prev) => prev + 1)} />} */}
            {loading && (
              <div style={{ textAlign: 'center', padding: '24px' }}>
                <Spin size="large" />
              </div>
            )}
            {!hasMore && dataSource.length > 0 && (
              <div style={{ textAlign: 'center', padding: '16px', color: '#999' }}>到底啦</div>
            )}
          </>
        )}
      />

      <CourseDetail
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
        data={selectedCourse}
      />
      <CourseEdit
        open={editVisible}
        onCancel={() => setEditVisible(false)}
        onOk={handleEditSubmit}
        data={editingCourse}
      />
    </PageContainer>
  );
}
