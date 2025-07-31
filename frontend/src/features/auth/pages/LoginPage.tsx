import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { LOGIN_MUTATION } from '@/graphql/mutations/auth/loginMutation';
import { useGraphqlMutation } from '@/lib/hooks/useGraphqlMutation';
import { cookie } from '@/lib/utils/cookie';
import { setUser } from '@/store/auth/authSlice';
import { Button } from '@/components/form/Button';
import { Input } from '@/components/form/Input';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const { execute, loading } = useGraphqlMutation({
    mutation: LOGIN_MUTATION,
    onSuccess: (data) => {
      const { token, user } = data?.login || {};
      if (token && user) {
        cookie.set('token', token, 7);
        dispatch(setUser(user));
        navigate('/patients');
      }
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    await execute({
      variables: { input: data },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Login
        </h2>
        <Input
          label="Email"
          type="email"
          {...register('email')}
          name="email"
          error={errors.email}
        />
        <Input
          label="Password"
          type="password"
          {...register('password')}
          name="password"
          error={errors.password}
        />
        <Button type="submit" loading={loading}>
          Login
        </Button>
      </form>
    </div>
  );
}
