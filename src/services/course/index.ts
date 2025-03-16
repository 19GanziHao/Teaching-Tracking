import { request } from '@umijs/max';

function getUser() {
  return JSON.parse(localStorage.getItem('userInfo') || '');
}
/**
 * 创建课程
 * @param body API.CreateCourseParams
 * @returns void
 */
export async function createCourse(body: API.CreateCourseParams) {
  const user = getUser();
  return request<API.Result<void>>('/api/course', {
    method: 'POST',
    data: {
      ...body,
      userId: user.userId,
    },
  });
}

/**
 * 查询课程
 * @param params API.FindCourseParams
 * @returns T
 */
export async function findCourse<T>(params: API.FindCourseParams) {
  const user = getUser();
  return request<API.Result<T>>('/api/course', {
    method: 'GET',
    params: {
      ...params,
      userId: user.userId,
    },
  });
}

/**
 * 通过id查询课程
 * @param params number
 * @returns T
 */
export async function findCourseById<T>(params: number) {
  return request<API.Result<T>>(`/api/course/${params}`, {
    method: 'GET',
  });
}

/**
 * 更新课程
 * @param id
 * @param body
 * @returns void
 */
export async function updateCourse(id: number, body: API.CreateCourseParams) {
  return request<API.Result<void>>(`/api/course/${id}`, {
    method: 'PUT',
    data: body,
  });
}

/**
 * 删除课程
 * @param id number
 * @returns
 */
export async function deleteCourse(id: number) {
  const user = getUser();
  return request<API.Result<void>>(`/api/course/${id}`, {
    method: 'DELETE',
    data: { userId: user.userId },
  });
}
