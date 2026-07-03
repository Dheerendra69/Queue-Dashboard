import { useForm } from "react-hook-form";
import Button from "../common/Button";
import Input from "../common/Input";

export default function QueueForm({
  onSubmit,
  defaultValues = {},
  loading = false,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <Input
        label="Queue Name"
        placeholder="Enter queue name"
        error={errors.name?.message}
        {...register("name", {
          required: "Queue name is required",
        })}
      />

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? "Saving..." : "Create Queue"}
      </Button>
    </form>
  );
}