import { DialogDescription } from '@radix-ui/react-dialog';
import Image from 'next/image';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

export function ForgotPassword() {
  const [open, setOpen] = React.useState(false);

  if (window.innerWidth > 640) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="text-gray-500 dark:text-gray-300">
            Forgot Password?
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">
              Contact your Institution / Admin in case you forgot your password
            </DialogTitle>
            <DialogDescription className="mx-auto">
              <Image
                src={'/assets/forgot_password.svg'}
                width={250}
                height={250}
                alt="Forgot password"
              />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="text-gray-500 dark:text-gray-300">
          Forgot Password?
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-center">
          <DrawerTitle>
            Contact your Institution / Admin in case you forgot your password
          </DrawerTitle>
          <DrawerDescription className="mx-auto">
            <Image
              src={'/assets/forgot_password.svg'}
              width={250}
              height={250}
              alt="Forgot password"
            />
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button>Okay</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
