import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { LoadingDisplay } from '../components/LoadingDisplay';
import AuthGuard from '../guards/AuthGuard';
import GuestGuard from '../guards/GuestGuard';

export const Loadable = (Component: any) => (props: JSX.IntrinsicAttributes) => (
    <Suspense fallback={<LoadingDisplay />}>
        <Component {...props} />
    </Suspense>
);

export const SignIn = Loadable(lazy(() => import('@/pages/auth/sign-in/SignInPage')));
const SignUp = Loadable(lazy(() => import('@/pages/auth/sign-up/SignUpPage')));

const Welcome = Loadable(lazy(() => import('@/pages/welcome/WelcomePage')));
const User = Loadable(lazy(() => import('@/pages/user/UserPage')));
const FeaturesAccountant = Loadable(
    lazy(() => import('@/pages/welcome/features/FeaturesAccountant')),
);
const FeaturesEmployee = Loadable(lazy(() => import('@/pages/welcome/features/FeaturesEmployee')));
const FeaturesAdministrator = Loadable(
    lazy(() => import('@/pages/welcome/features/FeaturesAdministrator')),
);

const router: RouteObject[] = [
    {
        index: true,
        element: <Welcome />,
    },
    {
        path: 'welcome',
        element: <Welcome />,
    },
    { path: 'accountant-features', element: <FeaturesAccountant /> },
    { path: 'employee-features', element: <FeaturesEmployee /> },
    { path: 'administrator-features', element: <FeaturesAdministrator /> },
    {
        path: 'signin',
        element: (
            <GuestGuard>
                <SignIn />
            </GuestGuard>
        ),
    },
    {
        path: 'signup',
        element: (
            <GuestGuard>
                <SignUp />
            </GuestGuard>
        ),
    },
    {
        path: '*',
        element: (
            <AuthGuard>
                <MainLayout />
            </AuthGuard>
        ),
        children: [
            {
                path: 'profile',
                children: [
                    { index: true, element: <User /> },
                ],
            },
        ],
    },
];

// eslint-disable-next-line react-refresh/only-export-components
export default router;
