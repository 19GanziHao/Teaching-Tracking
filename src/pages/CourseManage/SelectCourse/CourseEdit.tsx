import { useEffect, useState } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormSelect,
  ProFormDigit,
  ProFormTextArea,
  ProFormDatePicker,
} from '@ant-design/pro-components';
import { Modal, Form, Skeleton } from 'antd';
import type { CourseVo, TeachingScheduleVo } from './types';
import TeachSchedule from '../TeachSchedule';

interface CourseEditProps {
  open: boolean;
  onCancel: () => void;
  onOk: (values: CourseVo) => Promise<void>;
  data: CourseVo;
}

export default function CourseEdit({ open, onCancel, onOk, data }: CourseEditProps) {
  const [form] = ProForm.useForm();
  const [dataSource, setDataSource] = useState<TeachingScheduleVo[]>([]);

  useEffect(() => {
    if (data) {
      setDataSource(data.teachingSchedule || []);
    }
  }, [data]);

  return (
    <Modal
      title="编辑课程"
      open={open}
      onCancel={onCancel}
      footer={null}
      width={1200}
      destroyOnClose
    >
      {Object.keys(data).length === 0 ? (
        <Skeleton active />
      ) : (
        <ProForm
          form={form}
          initialValues={data}
          onFinish={async (values) => {
            values.teachingSchedule = dataSource;
            await onOk(values);
            return true;
          }}
          submitter={{
            searchConfig: {
              submitText: '保存',
            },
            resetButtonProps: {
              style: {
                display: 'none',
              },
            },
          }}
        >
          <ProForm.Group title="基本信息">
            <ProFormText name="courseName" label="课程名称" rules={[{ required: true }]} />
            <ProFormText name="courseCode" label="课程编号" rules={[{ required: true }]} />
            <ProFormSelect
              name="department"
              label="系(中心)"
              options={[
                { label: '教育技术学', value: '教育技术学' },
                { label: '学前教育', value: '学前教育' },
              ]}
              rules={[{ required: true }]}
            />
            <ProFormSelect
              name="semester"
              label="学期"
              options={[
                { label: '2023-2024上学期', value: '2023-2024上学期' },
                { label: '2023-2024下学期', value: '2023-2024下学期' },
              ]}
              rules={[{ required: true }]}
            />
            <ProFormTextArea name="assessmentRequirements" label="考核要求" width="xl" />
          </ProForm.Group>
          <ProForm.Group title="教师信息">
            <ProFormText
              name={['teacherInfo', 'teacherName']}
              label="教师姓名"
              rules={[{ required: true }]}
            />
            <ProFormText
              name={['teacherInfo', 'title']}
              label="职称"
              rules={[{ required: true }]}
            />
            <ProFormText
              name={['teacherInfo', 'education']}
              label="学历"
              rules={[{ required: true }]}
            />
            <ProFormText
              name={['teacherInfo', 'degree']}
              label="学位"
              rules={[{ required: true }]}
            />
          </ProForm.Group>
          <ProForm.Group title="授课班级">
            <ProFormText name={['classInfo', 'major']} label="专业" rules={[{ required: true }]} />
            <ProFormText name={['classInfo', 'grade']} label="年级" rules={[{ required: true }]} />
            <ProFormText
              name={['classInfo', 'className']}
              label="班级"
              rules={[{ required: true }]}
            />
            <ProFormDigit
              name={['classInfo', 'studentCount']}
              label="学生人数"
              rules={[{ required: true }]}
            />
          </ProForm.Group>
          <ProForm.Group title="学时分配">
            <ProFormDigit
              name={['hoursDistribution', 'totalHours']}
              label="总学时"
              rules={[{ required: true }]}
            />
            <ProFormDigit
              name={['hoursDistribution', 'lectureHours']}
              label="讲课学时"
              rules={[{ required: true }]}
            />
            <ProFormDigit
              name={['hoursDistribution', 'labHours']}
              label="实验学时"
              rules={[{ required: true }]}
            />
            <ProFormDigit
              name={['hoursDistribution', 'extracurricularHours']}
              label="课外学时"
              rules={[{ required: true }]}
            />
            <ProFormDigit
              name={['hoursDistribution', 'otherHours']}
              label="其他学时"
              rules={[{ required: true }]}
            />
            <ProFormTextArea
              name={['hoursDistribution', 'hoursDistributionNotes']}
              label="学时分配说明"
              width="xl"
            />
          </ProForm.Group>
          <ProForm.Group title="教材信息">
            <ProFormText name={['textbookInfo', 'textbookName']} label="教材名称" />
            <ProFormText name={['textbookInfo', 'author']} label="作者" />
            <ProFormText name={['textbookInfo', 'publisher']} label="出版社" />
            <ProFormDatePicker
              name={['textbookInfo', 'publishDate']}
              label="出版时间"
              placeholder="请输入出版时间"
            />
            <ProFormTextArea
              name={['textbookInfo', 'referencesBooks']}
              label="参考书目"
              width="xl"
            />
          </ProForm.Group>
          <ProForm.Group title="课程安排">
            <Form.Item name="teachingSchedule" style={{ width: '100%' }}>
              <TeachSchedule dataSource={dataSource} setDataSource={setDataSource as any} />
            </Form.Item>
          </ProForm.Group>
        </ProForm>
      )}
    </Modal>
  );
}
