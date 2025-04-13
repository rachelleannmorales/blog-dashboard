'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function BackButton() {
  const router = useRouter();

  return (
    <div className='flex justify-start'>
    <Button
      startIcon={<ArrowBackIcon />}
      onClick={() => router.back()}
      sx={{ mb: 2 }}
    >
      Back
    </Button>
    </div>
  );
} 