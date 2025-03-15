export interface CourseItem {
  /**
   * 课程ID
   */
  id: number;

  /**
   * 课程名称
   */
  courseName: string;

  /**
   * 课程编号
   */
  courseCode: string;

  /**
   * 学期
   */
  semester: string;

  /**
   * 填表日期
   */
  submissionDate: string;

  /**
   * 系(学院)
   */
  department: string;
}

export interface IData {
  list: CourseItem[];
  pageSize: string;
  pageNum: string;
  total: number;
}

interface TeacherInfoVo {
  id?: number;
  teacherName?: string;
  title?: string;
  education?: string;
  degree?: string;
}
interface ClassInfoVo {
  id?: number;
  major?: string;
  grade?: string;
  className?: string;
  studentCount?: number;
}
interface HoursDistributionVo {
  id?: number;
  totalHours?: number;
  lectureHours?: number;
  labHours?: number;
  extracurricularHours?: number;
  otherHours?: number;
  hoursDistributionNotes?: string;
}

interface TextbookInfoVo {
  id?: number;
  textbookName?: string;
  author?: string;
  publisher?: string;
  referencesBooks?: string;
  publishDate?: Date;
}

export interface TeachingScheduleVo {
  id: number;
  calendarWeek?: string;
  theoreticalHours?: number;
  experimentalHours?: number;
  extracurricularHours?: number;
  teachingContent?: string;
  teachingMethods?: string;
  homeworkArrangement?: string;
  executionStatus?: string;
  remarks?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CourseVo {
  id?: number;
  courseName?: string;
  courseCode?: string;
  semester?: string;
  submissionDate?: string;
  department?: string;
  assessmentRequirements?: string;
  teacherInfo?: TeacherInfoVo;
  classInfo?: ClassInfoVo;
  hoursDistribution?: HoursDistributionVo;
  textbookInfo?: TextbookInfoVo;
  teachingSchedule?: TeachingScheduleVo[];
}
