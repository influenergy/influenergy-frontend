"use client"
import { useForm ,FieldError} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { authApi } from '@/services/api';
import { setCredentials } from '@/store/features/authSlice';
import Link from 'next/link';
import { motion } from "framer-motion";
import { Label } from '../ui/label';
import { Eye, EyeOff, Loader2, Mail, User, UserRound } from "lucide-react";
import { Checkbox } from '../ui/checkbox';
import Image from 'next/image';
import { useState } from 'react';

interface FormInputProps {
  type: string;
  placeholder: string;
  register: any;
  name: keyof LoginFormData;
  error?: FieldError;
  icon: React.ReactNode;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

const FormInput = ({ type, placeholder, register, name, error, icon, showPassword, onTogglePassword }: FormInputProps) => (
  <div className="space-y-2 relative">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="border h-14 w-full px-5 focus:outline-none focus:border-b-2 focus:border-b-[#7877e6] font-light transition-all duration-300 rounded-md"
      />
      {onTogglePassword ? (
        <div 
          onClick={onTogglePassword}
          className="absolute right-4 top-5 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors duration-300"
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </div>
      ) : (
        <div className="absolute right-4 top-5 text-gray-400">
          {icon}
        </div>
      )}
    </motion.div>
    {error && (
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-sm text-red-500"
      >
        {error.message}
      </motion.p>
    )}
  </div>
);




const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().min(6, 'Minimum 6 characters').required('Required'),
  userType: yup.string().oneOf(['creator', 'brand']).required()
});

type LoginFormData = yup.InferType<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);


  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      userType: 'creator'
    }
  });

  const userType = watch('userType');

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) => {
      // authApi.login(data)
      console.log(data);
      return Promise.resolve(data);
    },
    onSuccess: (data) => {
      console.log(data);
      // dispatch(setCredentials(data));
      // Check if user has completed questionnaire
      router.push(`/questionnaire`);

      // const questionnaireCompleted = document.cookie.includes('questionnaireCompleted=true');
      // if (!questionnaireCompleted) {
      //   router.push(`/questionnaire?userType=${data.user.userType}`);
      // } else {
      //   router.push('/dashboard');
      // }
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row overflow-hidden">
    <motion.div 
      className="flex-1 flex justify-center items-center p-4 md:p-8 relative h-full overflow-y-auto"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.img 
        src="/images/line1.png" 
        alt="Logo" 
        width={400} 
        height={100} 
        className="absolute top-0 -right-36 -z-10 hidden md:block"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      />
      <motion.img 
        src="/images/line2.png" 
        alt="Logo" 
        width={400} 
        height={100} 
        className="absolute bottom-0 -right-36 -z-10 hidden md:block"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      />
      
      <div className="max-w-2xl w-full space-y-8">
        <motion.h3 
          className="text-black font-bold text-3xl text-left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Login To Your Account
        </motion.h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          <motion.div 
            className="space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
           
            <div>
              <Label htmlFor="email">Enter Email</Label>
            <FormInput
              type="email"
              placeholder="Enter Email Address"
              register={register}
              name="email"
              error={errors.email}
              icon={<Mail className="h-6 w-6" />}
              />
              </div>

            <div>
            <Label htmlFor="password">Password</Label>
            <FormInput
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              register={register}
              name="password"
              error={errors.password}
              icon={showPassword ? <Eye className="h-6 w-6" /> : <EyeOff className="h-6 w-6" />}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />
            </div>
          </motion.div>

          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button
              type="submit"
              className="w-full bg-[#7877e6] hover:bg-[#6564d8] transition-all py-7 text-white text-lg font-semibold font-poppins rounded-lg tracking-widest"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                "Continue"
              )}
            </Button>

            <p className="text-center text-muted-foreground font-light">
              Dont have an account?{" "}
              <Link href="/register" className="font-medium text-[#7877e6] hover:text-[#6564d8] transition-colors">
                Sign Up
              </Link>
            </p>
          </motion.div>
        </form>
      </div>
    </motion.div>

    <motion.div 
      className="hidden md:block h-screen"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Image
        src={"/images/login.webp"}
        className="w-full h-full object-contain"
        width={800}
        height={800}
        alt="login"
      />
    </motion.div>
  </div>
  );
}
