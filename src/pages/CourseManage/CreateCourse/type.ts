export interface TeachingScheduleType {
  /** 校历周次 */
  calendarWeek?: string;
  /** 某周是几月几号 */
  weekDate?: string;
  /** 理论学时 */
  theoreticalHours?: number;
  /** 实验学时 */
  experimentalHours?: number;
  /** 课外学时 */
  extracurricularHours?: number;
  /** 教学内容安排 */
  teachingContent?: string;
  /** 教学形式及其手段 */
  teachingMethods?: string;
  /** 作业或辅导安排 */
  homeworkArrangement?: string;
  /** 执行情况 */
  executionStatus?: string;
  /** 备注 */
  remarks?: string;
}

export interface CourseType {
  // 基础信息
  courseName: string;
  courseCode: string;
  department: string;
  submissionDate: string;
  semester: string;
  assessmentRequirements: string;
  startDate: string;
  // 教师信息
  teacherName: string;
  title: string;
  education: string;
  degree: string;
  // 班级信息
  major: string;
  className: string;
  grade: string;
  studentCount: number;
  // 教材信息
  textbookName: string;
  author: string;
  publisher: string;
  publishDate: string;
  referencesBooks: string;
  // 学时信息
  totalHours: number;
  lectureHours: number;
  labHours: number;
  extracurricularHours: number;
  otherHours: number;
  hoursDistributionNotes: string;
  // 课程安排
  course: TeachingScheduleType[];
}
