import { loginSchema, registerSchema } from "@/lib/AuthSchema";
import { FieldError, UseFormRegister } from "react-hook-form";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import * as yup from "yup";

type RegisterFormData = yup.InferType<typeof registerSchema>;
type LoginFormData = yup.InferType<typeof loginSchema>;

interface RegisterFormProps {
  type: string;
  placeholder: string;
  register: UseFormRegister<RegisterFormData>;
  name: keyof RegisterFormData;
  error?: FieldError;
  icon: React.ReactNode;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

interface LoginFormProps {
  type: string;
  placeholder: string;
  register: UseFormRegister<LoginFormData>;
  name: keyof LoginFormData;
  error?: FieldError;
  icon: React.ReactNode;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

export const RegisterFormInput = ({
  type,
  placeholder,
  register,
  name,
  error,
  icon,
  onTogglePassword,
}: RegisterFormProps) => (
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

export const LoginFormInput = ({
  type,
  placeholder,
  register,
  name,
  error,
  icon,
  showPassword,
  onTogglePassword,
}: LoginFormProps) => (
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
        {...register(name)}
        className="border h-12 sm:h-14 w-full px-4 sm:px-5 focus:outline-none focus:border-b-2 focus:border-b-primary font-light transition-all duration-300 rounded-md text-base sm:text-lg"
      />
      {onTogglePassword ? (
        <div
          onClick={onTogglePassword}
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors duration-300 p-2"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 sm:h-6 sm:w-6" />
          ) : (
            <Eye className="h-5 w-5 sm:h-6 sm:w-6" />
          )}
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
