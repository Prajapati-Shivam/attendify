import Image from 'next/image';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';

import DialogDrawer from '../common/dialogs/DialogDrawer';

export function ForgotPassword() {
  const [opened, setOpened] = useState(false);
  return (
    <DialogDrawer
      opened={opened}
      setOpened={setOpened}
      positiveCallback={() => setOpened(false)}
      title="Contact your Institution / Admin in case you forgot your password"
      trigger={
        <Button variant="ghost" className="text-gray-500 dark:text-gray-300">
          Forgot Password?
        </Button>
      }
    >
      <div className="flex justify-center">
        <Image
          src={'/assets/forgot_password.svg'}
          width={250}
          height={250}
          alt="Forgot password"
        />
      </div>
    </DialogDrawer>
  );
}
