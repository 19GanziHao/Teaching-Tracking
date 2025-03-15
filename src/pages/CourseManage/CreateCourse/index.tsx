import React, { useEffect, useState } from 'react';
import {
  PageContainer,
  ProCard,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import { message } from 'antd';
import TeachSchedule, { DataSourceType } from '../TeachSchedule';
import { createCourse } from '@/services/course';
import { CourseType, TeachingScheduleType } from './type';

export default function CreateCourse() {
  const [semesters, setSemesters] = useState<{ value: string; label: string }[]>([]);
  const [dataSource, setDataSource] = useState<DataSourceType[]>([]);
  useEffect(() => {
    const year = new Date().getFullYear();
    const result = [];
    for (let i = year - 2; i < year + 2; i++) {
      result.push(
        {
          value: `${i}-${i + 1}上学期`,
          label: `${i}-${i + 1}上学期`,
        },
        {
          value: `${i}-${i + 1}下学期`,
          label: `${i}-${i + 1}下学期`,
        },
      );
    }
    setSemesters(result);
  }, []);

  function handleParams(params: CourseType): API.CreateCourseParams {
    const {
      courseName,
      courseCode,
      department,
      submissionDate,
      semester,
      startDate,
      assessmentRequirements,
      className,
      teacherName,
      textbookName,
      title,
      education,
      degree,
      major,
      grade,
      studentCount,
      author,
      publisher,
      publishDate,
      referencesBooks,
      totalHours,
      lectureHours,
      labHours,
      extracurricularHours,
      otherHours,
      hoursDistributionNotes,
      course,
    } = params;

    const teachingSchedule: TeachingScheduleType[] = course.map((item, index, array) => {
      // 如果当前项没有 calendarWeek，使用上一项的值
      const currentWeek =
        item.calendarWeek === '-'
          ? index > 0
            ? array[index - 1].calendarWeek || '1'
            : '1'
          : item.calendarWeek || '1';
      const weekDate = item.calendarWeek
        ? new Date(startDate).setDate(new Date(startDate).getDate() + (+currentWeek - 1) * 7)
        : index > 0
          ? array[index - 1].weekDate
          : new Date(startDate);
      item.weekDate = new Date(weekDate as string).toISOString().split('T')[0];

      return {
        calendarWeek: item.calendarWeek,
        weekDate: item.weekDate,
        theoreticalHours: item.theoreticalHours,
        experimentalHours: item.experimentalHours,
        extracurricularHours: item.extracurricularHours,
        teachingContent: item.teachingContent,
        teachingMethods: item.teachingMethods,
        homeworkArrangement: item.homeworkArrangement,
        executionStatus: item.executionStatus,
        remarks: item.remarks,
      };
    });
    return {
      courseName,
      courseCode,
      department,
      submissionDate,
      semester,
      assessmentRequirements,
      teacherInfo: {
        teacherName,
        title,
        education,
        degree,
      },
      classInfo: {
        major,
        className,
        grade,
        studentCount,
      },
      textbookInfo: {
        textbookName,
        author,
        publisher,
        publishDate,
        referencesBooks,
      },
      hoursDistribution: {
        totalHours,
        lectureHours,
        labHours,
        extracurricularHours,
        otherHours,
        hoursDistributionNotes,
      },
      teachingSchedule,
    };
  }

  return (
    <PageContainer>
      <ProCard>
        <StepsForm
          onFinish={async (values: CourseType) => {
            const result = { ...values, course: dataSource };
            console.log(result);
            const params = handleParams(result);
            await createCourse(params);
            message.success('提交成功');
          }}
        >
          <StepsForm.StepForm
            title="进度计划表概述"
            onFinish={async (values) => {
              console.log(values, '进度计划表概述');
              return true;
            }}
          >
            <ProFormText
              width="md"
              name="courseName"
              label="课程名称"
              placeholder="请输入课程名称"
              rules={[{ required: true }]}
            />
            <ProFormText
              width="md"
              name="courseCode"
              label="课程编号"
              placeholder="请输入名称"
              rules={[{ required: true }]}
            />
            <ProFormSelect
              rules={[{ required: true }]}
              width="xs"
              options={[
                {
                  value: '教育技术学',
                  label: '教育技术学',
                },
                {
                  value: '学前教育',
                  label: '学前教育',
                },
              ]}
              name="department"
              label="系(中心)"
            />

            <ProFormDatePicker
              width="md"
              label="填表日期"
              name="submissionDate"
              rules={[{ required: true }]}
            />
            <ProFormSelect
              width="md"
              options={semesters.map((semester) => ({
                value: semester.value,
                label: semester.label,
              }))}
              name="semester"
              label="学期"
              rules={[{ required: true }]}
            />
            <ProFormDatePicker
              width="md"
              label="开学日期"
              name="startDate"
              rules={[{ required: true }]}
            />
            <ProFormTextArea
              label="课程考核说明及要求"
              width="md"
              name="assessmentRequirements"
              rules={[{ required: true }]}
            />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            title="主讲教师"
            onFinish={async (values) => {
              console.log(values, '主讲教师');
              return true;
            }}
          >
            <ProFormText
              width="md"
              name="teacherName"
              label="名称"
              placeholder="请输入名称"
              rules={[{ required: true }]}
            />
            <ProFormText
              width="md"
              name="title"
              label="职称"
              placeholder="请输入职称"
              rules={[{ required: true }]}
            />
            <ProFormText
              width="md"
              name="education"
              label="学历"
              placeholder="请输入学历"
              rules={[{ required: true }]}
            />
            <ProFormText
              width="md"
              name="degree"
              label="学位"
              placeholder="请输入学位"
              rules={[{ required: true }]}
            />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            title="授课班级"
            onFinish={async () => {
              return true;
            }}
          >
            <ProFormText
              width="md"
              name="major"
              label="专业"
              placeholder="请输入专业"
              rules={[{ required: true }]}
            />

            <ProFormText
              width="md"
              name="grade"
              label="年级"
              placeholder="请输入年级"
              rules={[{ required: true }]}
            />

            <ProFormText
              width="md"
              name="className"
              label="班级"
              placeholder="请输入班级"
              rules={[{ required: true }]}
            />

            <ProFormText
              width="md"
              name="studentCount"
              label="人数"
              placeholder="请输入人数"
              rules={[{ required: true }]}
            />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            title="教材信息"
            onFinish={async (values) => {
              console.log(values, '教师信息');
              return true;
            }}
          >
            <ProFormText
              width="md"
              name="textbookName"
              label="名称"
              placeholder="请输入名称"
              rules={[{ required: true }]}
            />
            <ProFormText
              width="md"
              name="author"
              label="编著者"
              placeholder="请输入编著者"
              rules={[{ required: true }]}
            />
            <ProFormText width="md" name="publisher" label="出版社" placeholder="请输入出版社" />
            <ProFormDatePicker
              width="md"
              name="publishDate"
              label="出版时间"
              placeholder="请输入出版时间"
              rules={[{ required: true }]}
            />
            <ProFormTextArea
              width="md"
              name="referencesBooks"
              label="主要参考书籍"
              placeholder="请输入主要参考书籍"
            />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            title="学时分配"
            onFinish={async (values) => {
              console.log(values, '学时分配');
              return true;
            }}
          >
            <ProFormText
              width="md"
              name="totalHours"
              label="总学时"
              placeholder="请输入总学时"
              rules={[{ required: true }]}
            />
            <ProFormText
              width="md"
              name="lectureHours"
              label="授课学时"
              placeholder="请输入授课学时"
              rules={[{ required: true }]}
            />
            <ProFormText
              width="md"
              name="labHours"
              label="实验学时"
              placeholder="请输入实验学时"
              rules={[{ required: true }]}
            />
            <ProFormText
              width="md"
              name="extracurricularHours"
              label="课外学时"
              placeholder="请输入课外学时"
              rules={[{ required: true }]}
            />
            <ProFormText
              width="md"
              name="otherHours"
              label="其他学时"
              placeholder="请输入其他学时"
              rules={[{ required: true }]}
            />
            <ProFormTextArea
              width="md"
              name="hoursDistributionNotes"
              label="学时分配说明"
              placeholder="请输入学时分配说明"
            />
          </StepsForm.StepForm>
          <StepsForm.StepForm title="课程安排">
            <TeachSchedule setDataSource={setDataSource} dataSource={dataSource} />
          </StepsForm.StepForm>
        </StepsForm>
      </ProCard>
    </PageContainer>
  );
}
