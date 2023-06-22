import { Icons } from "./icons";

type ToastProps = {
  children: React.ReactNode;
  error?: boolean;
  msg?: any;
};
const ToastDesc = ({ children, error = false, msg }: ToastProps) => {
  return (
    <div className="flex items-center justify-start gap-4">
      {error ? (
        <>
          <Icons.error className="w-8 h-8 text-white" />
        </>
      ) : (
        <Icons.success className="w-8 h-8 text-green-600" />
      )}
      <p>{error && msg ? msg : children}</p>
    </div>
  );
};

export default ToastDesc;
