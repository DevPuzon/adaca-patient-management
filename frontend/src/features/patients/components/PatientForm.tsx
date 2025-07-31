import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/form/Button';
import { Input } from '@/components/form/Input';
import { Select } from '@/components/form/Select';

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  birthDate: z.string().min(1, 'Birth date is required'),
  gender: z.enum(['Male', 'Female', 'Other'], 'Gender is required'),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  loading: boolean;
  onSubmit: (form: FormValues) => void;
  initialData?: Partial<FormValues>;
};

export default function PatientForm({
  loading,
  onSubmit,
  initialData = {},
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-6 rounded-lg space-y-5"
    >
      <h2 className="text-xl font-semibold text-gray-800">Patient Details</h2>

      <Input
        label="First Name"
        placeholder="Enter first name"
        {...register('firstName')}
        error={errors.firstName}
      />

      <Input
        label="Last Name"
        placeholder="Enter last name"
        {...register('lastName')}
        error={errors.lastName}
      />

      <Input
        label="Email"
        type="email"
        placeholder="Enter email address"
        {...register('email')}
        error={errors.email}
      />

      <Input
        label="Phone"
        type="tel"
        placeholder="Enter phone number"
        {...register('phone')}
        error={errors.phone}
      />

      <Input
        label="Birth Date"
        type="date"
        {...register('birthDate')}
        error={errors.birthDate}
      />

      <Select
        label="Gender"
        {...register('gender')}
        error={errors.gender}
        options={[
          { label: 'Select gender', value: '' },
          { label: 'Male', value: 'Male' },
          { label: 'Female', value: 'Female' },
        ]}
      />

      <div className="pt-4">
        <Button type="submit" loading={loading}>
          Save Patient
        </Button>
      </div>
    </form>
  );
}
