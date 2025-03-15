import { request } from '@umijs/max';

/** 登录接口 */
export async function login(body: API.LoginParams) {
  return request<API.Result<API.LoginResult>>('/api/auth/login', {
    method: 'POST',
    data: body,
  });
}

/** 注册接口 */
export async function register(body: API.RegisterParams) {
  return request<API.Result<void>>('/api/auth/register', {
    method: 'POST',
    data: body,
  });
}

/** 退出接口 */
export async function outLogin() {
  // 移除 token
  localStorage.removeItem('TOKEN');
  // 移除用户信息
  localStorage.removeItem('userInfo');
}
