// @ts-ignore
/* eslint-disable */
declare namespace API {
  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginResult = {
    /** token */
    token?: string;
    /** 用户名 */
    name?: string;
    /** 邮箱 */
    email?: string;
    /** 当前用户的角色权限 目前三种 教师、系统主、院长 */
    roles?: string[];
  };

  type LoginResult = {
    /** token */
    token?: string;
    /** 用户名 */
    name?: string;
    /** 邮箱 */
    email?: string;
    /** 当前用户的角色权限 目前三种 教师、系统主、院长 */
    roles?: string[];
  };

  type Result<T> = {
    /** 返回码 200 success */
    code?: number;
    /** 返回内容 */
    data?: T;
    /** 错误内容 */
    message?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    /** 邮箱 */
    email?: string;
    /** 密码 */
    password?: string;
    /**保存信息 */
    saveInfo?: boolean;
  };

  type RegisterParams = {
    /** 用户名 */
    name?: string;
    /** 邮箱 */
    email?: string;
    /** 密码 */
    password?: string;
    /** 角色 */
    role?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type CreateCourseParams = {
    /**
     * 课程名称
     */
    courseName?: string;

    /**
     * 课程编号
     */
    courseCode?: string;

    /**
     * 学期
     */
    semester?: string;

    /**
     * 填表日期
     */
    submissionDate?: string;

    /**
     * 系(学院)
     */
    department?: string;

    /**
     * 课程考核说明及要求
     */
    assessmentRequirements?: string;

    /**
     * 教师信息
     */
    teacherInfo?: {
      /**
       * 教师姓名
       */
      teacherName?: string;
      /**
       * 主讲教师职称
       */
      title?: string;
      /**
       * 主讲教师学历
       */
      education?: string;
      /**
       * 主讲教师学位
       */
      degree?: string;
    };

    /**
     * 班级信息
     */
    classInfo?: {
      /**
       * 授课对象专业
       */
      major?: string;
      /**
       * 授课对象年级
       */
      grade?: string;
      /**
       * 授课对象班级
       */
      className?: string;
      /**
       * 授课对象人数
       */
      studentCount?: number;
    };

    /**
     * 学时分配
     */
    hoursDistribution?: {
      /**
       * 总学时
       */
      totalHours?: number;
      /**
       * 授课学时
       */
      lectureHours?: number;
      /**
       * 实验学时
       */
      labHours?: number;
      /**
       * 课外学时
       */
      extracurricularHours?: number;
      /**
       * 其他学时
       */
      otherHours?: number;
      /**
       * 学时分配说明
       */
      hoursDistributionNotes?: string;
    };

    /**
     * 教材信息
     */
    textbookInfo?: {
      /**
       * 教材名称
       */
      textbookName?: string;
      /**
       * 教材编著者
       */
      author?: string;
      /**
       * 教材出版社
       */
      publisher?: string;
      /**
       * 主要参考书
       */
      referencesBooks?: string;
      /**
       * 教材出版时间
       */
      publishDate?: string;
    };

    /**
     * 教学计划表
     */
    teachingSchedule?: {
      /**
       * 校历周次
       */
      calendarWeek?: string;
      /**
       * 理论学时
       */
      theoreticalHours?: number;
      /**
       * 实验学时
       */
      experimentalHours?: number;
      /**
       * 课外学时
       */
      extracurricularHours?: number;
      /**
       * 教学内容安排
       */
      teachingContent?: string;
      /**
       * 教学形式及手段
       */
      teachingMethods?: string;
      /**
       * 作业或辅导安排
       */
      homeworkArrangement?: string;
      /**
       * 执行情况
       */
      executionStatus?: string;
      /**
       * 备注
       */
      remarks?: string;
    }[];
  };

  type FindCourseParams = {
    /**
     * 课程名称
     */
    courseName?: string;

    /**
     * 课程编号
     */
    courseCode?: string;

    /**
     * 学期
     */
    semester?: string;

    /**
     * 填表日期
     */
    submissionDate?: string;

    /**
     * 学院
     */
    department?: string;

    /**
     * 页码
     */
    pageNum: number;

    /**
     * 每页数量
     */
    pageSize: number;
  };
  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
