import { FieldError, UseFormRegister, Path } from "react-hook-form";
import { motion } from "framer-motion";

interface RegisterFormProps<T extends object> {
  type: string;
  placeholder: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: FieldError;
  icon: React.ReactNode;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

interface LoginFormProps<T extends object> {
  type: string;
  placeholder: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: FieldError;
  autoComplete?: string;
  icon: React.ReactNode;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

export const RegisterFormInput = <T extends object>({
  type,
  placeholder,
  register,
  name,
  error,
  icon,
  onTogglePassword,
}: RegisterFormProps<T>) => (
  <div className="space-y-2 relative">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="border h-12 sm:h-14 w-full px-4 sm:px-5 focus:outline-none focus:border-b-2 focus:border-b-primary font-light transition-all duration-300 rounded-md text-base sm:text-lg"
      />
      {onTogglePassword ? (
        <div
          onClick={onTogglePassword}
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors duration-300"
        >
          {icon}
        </div>
      ) : (
        <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
    </motion.div>
    {error && (
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-xs sm:text-sm text-red-500"
      >
        {error.message}
      </motion.p>
    )}
  </div>
);

export const LoginFormInput = <T extends object>({
  type,
  placeholder,
  register,
  name,
  error,
  icon,
  autoComplete,
  onTogglePassword,
}: LoginFormProps<T>) => {
  const { onChange, ...rest } = register(name);

  return (
    <div className="space-y-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <input
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...rest}
          onChange={(e) => {
            // e.target.value = e.target.value.trimStart(); // trims only leading spaces while typing
            onChange(e);
          }}
          onBlur={(e) => {
            e.target.value = e.target.value.trim(); // trims leading & trailing spaces on blur
            onChange(e);
          }}
          className="border h-12 sm:h-14 w-full px-4 sm:px-5 focus:outline-none focus:border-b-2 focus:border-b-primary font-light transition-all duration-300 rounded-md text-base sm:text-lg"
        />
        {onTogglePassword ? (
          <div
            onClick={onTogglePassword}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors duration-300 p-2"
          >
            {icon}
          </div>
        ) : (
          <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
      </motion.div>
      {error && (
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xs sm:text-sm text-red-500"
        >
          {error.message}
        </motion.p>
      )}
    </div>
  );
};

