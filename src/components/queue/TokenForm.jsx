import { useForm } from "react-hook-form";

import Button from "../common/Button";
import Input from "../common/Input";

export default function TokenForm({
  onSubmit,
  loading = false,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function submit(data) {
    onSubmit(data);

    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex gap-4 items-end flex-wrap"
    >
      <div className="flex-1 min-w-[250px]">

        <Input
          label="Customer Name"
          placeholder="Enter customer name"
          error={errors.customerName?.message}
          {...register("customerName", {
            required: "Customer name is required",
          })}
        />

      </div>

      <Button
        type="submit"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Token"}
      </Button>

    </form>
  );
}