import * as React from 'react';

import {
  BellIcon,
  BluetoothIcon,
  CreditCardIcon,
  DownloadIcon,
  EyeIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  FolderOpenIcon,
  FolderSearchIcon,
  HelpCircleIcon,
  KeyboardIcon,
  LanguagesIcon,
  LayoutIcon,
  LogOutIcon,
  MailIcon,
  MonitorIcon,
  MoonIcon,
  MoreHorizontalIcon,
  MoreVerticalIcon,
  PaletteIcon,
  PlusIcon,
  SaveIcon,
  SettingsIcon,
  ShieldIcon,
  SunIcon,
  UserIcon,
} from 'lucide-react';
import { Example, ExampleWrapper } from '@/components/example';
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from '@/components/ui/combobox';
import {
  Menu,
  MenuCheckboxItem,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuPopup,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubPopup,
  MenuSubTrigger,
  MenuTrigger,
} from '@/components/ui/menu';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export function ComponentExample() {
  return (
    <ExampleWrapper>
      <CardExample />
      <FormExample />
    </ExampleWrapper>
  );
}

function CardExample() {
  return (
    <Example title="Card" className="items-center justify-center">
      <Card className="relative w-full max-w-sm overflow-hidden pt-0">
        <div className="bg-primary absolute inset-0 z-30 aspect-video opacity-50 mix-blend-color" />
        <img
          src="https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Photo by mymind on Unsplash"
          title="Photo by mymind on Unsplash"
          className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale"
        />
        <CardHeader>
          <CardTitle>Observability Plus is replacing Monitoring</CardTitle>
          <CardDescription>
            Switch to the improved way to explore your data, with natural
            language. Monitoring will no longer be available on the Pro plan in
            November, 2025
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <AlertDialog>
            <AlertDialogTrigger render={<Button />}>
              <PlusIcon data-icon="inline-start" />
              Show Dialog
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <div className="flex items-start gap-4">
                  <AlertDialogMedia>
                    <BluetoothIcon />
                  </AlertDialogMedia>
                  <div>
                    <AlertDialogTitle>
                      Allow accessory to connect?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="mt-2">
                      Do you want to allow the USB accessory to connect to this
                      device?
                    </AlertDialogDescription>
                  </div>
                </div>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogClose render={<Button variant="ghost" />}>
                  Don&apos;t allow
                </AlertDialogClose>
                <Button>Allow</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Badge variant="secondary" className="ml-auto">
            Warning
          </Badge>
        </CardFooter>
      </Card>
    </Example>
  );
}

const frameworks = [
  'Next.js',
  'SvelteKit',
  'Nuxt.js',
  'Remix',
  'Astro',
] as const;

const roleItems = [
  { label: 'Developer', value: 'developer' },
  { label: 'Designer', value: 'designer' },
  { label: 'Manager', value: 'manager' },
  { label: 'Other', value: 'other' },
];

function FormExample() {
  const [notifications, setNotifications] = React.useState({
    email: true,
    sms: false,
    push: true,
  });
  const [theme, setTheme] = React.useState('light');

  return (
    <Example title="Form">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>Please fill in your details below</CardDescription>
          <CardAction>
            <Menu>
              <MenuTrigger render={<Button variant="ghost" size="icon" />}>
                <MoreVerticalIcon />
                <span className="sr-only">More options</span>
              </MenuTrigger>
              <MenuPopup align="end" className="w-56">
                <MenuGroup>
                  <MenuGroupLabel>File</MenuGroupLabel>
                  <MenuItem>
                    <FileIcon />
                    New File
                    <MenuShortcut>⌘N</MenuShortcut>
                  </MenuItem>
                  <MenuItem>
                    <FolderIcon />
                    New Folder
                    <MenuShortcut>⇧⌘N</MenuShortcut>
                  </MenuItem>
                  <MenuSub>
                    <MenuSubTrigger>
                      <FolderOpenIcon />
                      Open Recent
                    </MenuSubTrigger>
                    <MenuSubPopup>
                      <MenuGroup>
                        <MenuGroupLabel>Recent Projects</MenuGroupLabel>
                        <MenuItem>
                          <FileCodeIcon />
                          Project Alpha
                        </MenuItem>
                        <MenuItem>
                          <FileCodeIcon />
                          Project Beta
                        </MenuItem>
                        <MenuSub>
                          <MenuSubTrigger>
                            <MoreHorizontalIcon />
                            More Projects
                          </MenuSubTrigger>
                          <MenuSubPopup>
                            <MenuItem>
                              <FileCodeIcon />
                              Project Gamma
                            </MenuItem>
                            <MenuItem>
                              <FileCodeIcon />
                              Project Delta
                            </MenuItem>
                          </MenuSubPopup>
                        </MenuSub>
                      </MenuGroup>
                      <MenuSeparator />
                      <MenuGroup>
                        <MenuItem>
                          <FolderSearchIcon />
                          Browse...
                        </MenuItem>
                      </MenuGroup>
                    </MenuSubPopup>
                  </MenuSub>
                  <MenuSeparator />
                  <MenuItem>
                    <SaveIcon />
                    Save
                    <MenuShortcut>⌘S</MenuShortcut>
                  </MenuItem>
                  <MenuItem>
                    <DownloadIcon />
                    Export
                    <MenuShortcut>⇧⌘E</MenuShortcut>
                  </MenuItem>
                </MenuGroup>
                <MenuSeparator />
                <MenuGroup>
                  <MenuGroupLabel>View</MenuGroupLabel>
                  <MenuCheckboxItem
                    checked={notifications.email}
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        email: checked === true,
                      })
                    }
                  >
                    <EyeIcon />
                    Show Sidebar
                  </MenuCheckboxItem>
                  <MenuCheckboxItem
                    checked={notifications.sms}
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        sms: checked === true,
                      })
                    }
                  >
                    <LayoutIcon />
                    Show Status Bar
                  </MenuCheckboxItem>
                  <MenuSub>
                    <MenuSubTrigger>
                      <PaletteIcon />
                      Theme
                    </MenuSubTrigger>
                    <MenuSubPopup>
                      <MenuGroup>
                        <MenuGroupLabel>Appearance</MenuGroupLabel>
                        <MenuRadioGroup value={theme} onValueChange={setTheme}>
                          <MenuRadioItem value="light">
                            <SunIcon />
                            Light
                          </MenuRadioItem>
                          <MenuRadioItem value="dark">
                            <MoonIcon />
                            Dark
                          </MenuRadioItem>
                          <MenuRadioItem value="system">
                            <MonitorIcon />
                            System
                          </MenuRadioItem>
                        </MenuRadioGroup>
                      </MenuGroup>
                    </MenuSubPopup>
                  </MenuSub>
                </MenuGroup>
                <MenuSeparator />
                <MenuGroup>
                  <MenuGroupLabel>Account</MenuGroupLabel>
                  <MenuItem>
                    <UserIcon />
                    Profile
                    <MenuShortcut>⇧⌘P</MenuShortcut>
                  </MenuItem>
                  <MenuItem>
                    <CreditCardIcon />
                    Billing
                  </MenuItem>
                  <MenuSub>
                    <MenuSubTrigger>
                      <SettingsIcon />
                      Settings
                    </MenuSubTrigger>
                    <MenuSubPopup>
                      <MenuGroup>
                        <MenuGroupLabel>Preferences</MenuGroupLabel>
                        <MenuItem>
                          <KeyboardIcon />
                          Keyboard Shortcuts
                        </MenuItem>
                        <MenuItem>
                          <LanguagesIcon />
                          Language
                        </MenuItem>
                        <MenuSub>
                          <MenuSubTrigger>
                            <BellIcon />
                            Notifications
                          </MenuSubTrigger>
                          <MenuSubPopup>
                            <MenuGroup>
                              <MenuGroupLabel>
                                Notification Types
                              </MenuGroupLabel>
                              <MenuCheckboxItem
                                checked={notifications.push}
                                onCheckedChange={(checked) =>
                                  setNotifications({
                                    ...notifications,
                                    push: checked === true,
                                  })
                                }
                              >
                                <BellIcon />
                                Push Notifications
                              </MenuCheckboxItem>
                              <MenuCheckboxItem
                                checked={notifications.email}
                                onCheckedChange={(checked) =>
                                  setNotifications({
                                    ...notifications,
                                    email: checked === true,
                                  })
                                }
                              >
                                <MailIcon />
                                Email Notifications
                              </MenuCheckboxItem>
                            </MenuGroup>
                          </MenuSubPopup>
                        </MenuSub>
                      </MenuGroup>
                      <MenuSeparator />
                      <MenuGroup>
                        <MenuItem>
                          <ShieldIcon />
                          Privacy & Security
                        </MenuItem>
                      </MenuGroup>
                    </MenuSubPopup>
                  </MenuSub>
                </MenuGroup>
                <MenuSeparator />
                <MenuGroup>
                  <MenuItem>
                    <HelpCircleIcon />
                    Help & Support
                  </MenuItem>
                  <MenuItem>
                    <FileTextIcon />
                    Documentation
                  </MenuItem>
                </MenuGroup>
                <MenuSeparator />
                <MenuGroup>
                  <MenuItem variant="destructive">
                    <LogOutIcon />
                    Sign Out
                    <MenuShortcut>⇧⌘Q</MenuShortcut>
                  </MenuItem>
                </MenuGroup>
              </MenuPopup>
            </Menu>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="small-form-name">Name</FieldLabel>
                <Input
                  id="small-form-name"
                  placeholder="Enter your name"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="small-form-role">Role</FieldLabel>
                <Select items={roleItems} defaultValue={null}>
                  <SelectTrigger id="small-form-role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {roleItems.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="small-form-framework">Framework</FieldLabel>
              <Combobox items={frameworks}>
                <ComboboxInput
                  id="small-form-framework"
                  placeholder="Select a framework"
                  required
                />
                <ComboboxPopup>
                  <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxPopup>
              </Combobox>
            </Field>
            <Field>
              <FieldLabel htmlFor="small-form-comments">Comments</FieldLabel>
              <Textarea
                id="small-form-comments"
                placeholder="Add any additional comments"
              />
            </Field>
            <Field className="flex flex-row gap-2">
              <Button type="submit">Submit</Button>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Field>
          </form>
        </CardContent>
      </Card>
    </Example>
  );
}
