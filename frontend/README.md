# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Authentication Context

An `AuthProvider` has been added at `src/context/AuthContext.jsx` and is wrapped around the app in `src/main.jsx`.

Usage inside components:

```jsx
import { useAuth } from '../context/AuthContext.jsx';

function Profile() {
	const { user, logout } = useAuth();
	return (
		<div>
			<pre>{JSON.stringify(user, null, 2)}</pre>
			<button onClick={logout}>Logout</button>
		</div>
	);
}
```

Available values: `user`, `token`, `isAuthenticated`, `loading`, `error`, and methods `login(credentials)`, `logout()`, `register(payload)`.

`login` expects backend response containing `{ token, user }` (or `{ access_token }`). Adjust mapping if your API differs.
