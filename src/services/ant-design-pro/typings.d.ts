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
