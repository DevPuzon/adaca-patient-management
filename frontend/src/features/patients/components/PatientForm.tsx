type Props = {
  loading: boolean;
  onSubmit: (form: any) => void;
  initialData?: Partial<any>;
};

export default function PatientForm({
  loading,
  onSubmit,
  initialData = {},
}: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      phone: form.phone.value,
      birthDate: form.birthDate.value,
      gender: form.gender.value,
    };
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 rounded-lg space-y-5"
    >
      <h2 className="text-xl font-semibold text-gray-800">Patient Details</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          First Name
        </label>
        <input
          name="firstName"
          defaultValue={initialData.firstName}
          placeholder="Enter first name"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Last Name
        </label>
        <input
          name="lastName"
          defaultValue={initialData.lastName}
          placeholder="Enter last name"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          name="email"
          defaultValue={initialData.email}
          type="email"
          placeholder="Enter email address"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone
        </label>
        <input
          name="phone"
          defaultValue={initialData.phone}
          type="tel"
          placeholder="Enter phone number"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Birth Date
        </label>
        <input
          name="birthDate"
          defaultValue={initialData.birthDate}
          type="date"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gender
        </label>
        <select
          name="gender"
          defaultValue={initialData.gender}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Please wait..." : "Save Patient"}
        </button>
      </div>
    </form>
  );
}
