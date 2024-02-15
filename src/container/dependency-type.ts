export const DEPENDENCY_TYPE = {
	Application: Symbol.for('Application'),
	UserController: Symbol.for('UserController'),
	AuthController: Symbol.for('AuthController'),
	AuthService: Symbol.for('AuthService'),
	UserService: Symbol.for('UserService'),
	LoggerService: Symbol.for('LoggerService'),
	ExceptionHandler: Symbol.for('ExceptionHandler'),
	ConfigService: Symbol.for('ConfigService'),
	PrismaService: Symbol.for('PrismaService'),
	UserDao: Symbol.for('UserDao'),
};
