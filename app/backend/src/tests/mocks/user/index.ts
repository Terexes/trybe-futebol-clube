export const userMock = {
  id: 1,
  username: 'user-test',
  role: 'admin',
  email: 'admin@admin.com',
  password: 'mySecretPassword',
};

export const loginMock = {
  email: 'admin@admin.com',
  password: 'mySecretPassword',
};

export const tokenMock = {
  token: 'myTestToken',
};

export const noEmail = {
  password: 'secret_admin',
};

export const noPassword = {
  email: 'admin@admin.com',
};

export const wrongEmail = {
  email: 'admin-teste@admin.com',
  password: 'mySecretPassword',
};

export const wrongPassword = {
  email: 'admin@admin.com',
  password: 'test123',
};

export const testRole = {
	"role": "admin"
}