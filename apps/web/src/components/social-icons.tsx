import Github from '@/web/components/icons/github';
import Google from '@/web/components/icons/google';

import { Button } from './ui/button';

export function SocialIcons() {
  const socialIcons = [
    {
      name: 'Google',
      icon: Google,
      action: () => {
        // eslint-disable-next-line no-console
        console.log('Google');
      },
    },
    {
      name: 'GitHub',
      icon: Github,
      action: () => {
        // eslint-disable-next-line no-console
        console.log('Github');
      },
    },
  ];

  return (
    <div className="space-y-4">
      {socialIcons.map(({ name, icon: Icon, action }) => (
        <Button
          key={name}
          type="button"
          onClick={action}
          variant="outline"
          className="w-full flex gap-2 bg-background border-border cursor-pointer"
        >
          <Icon className="mr-2 h-4 w-4" />
          {name}
        </Button>
      ))}
    </div>
  );
}
