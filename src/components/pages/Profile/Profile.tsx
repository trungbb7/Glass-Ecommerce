import {Field, FieldDescription, FieldGroup, FieldLabel, FieldSet} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Header} from "@/components/Header/index.ts";

function Profile(props) {
    return (
        <div>
            <Header></Header>
            <div>
                <FieldSet className="flex flex-col w-full max-w-md gap-4 mx-auto mt-10">
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="username">Username</FieldLabel>
                        <Input id="username" type="text" placeholder="Max Leiter"/>
                        <FieldDescription>
                            Choose a unique username for your account.
                        </FieldDescription>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <FieldDescription>
                            Must be at least 8 characters long.
                        </FieldDescription>
                        <Input id="password" type="password" placeholder="••••••••"/>
                    </Field>
                    <Button>Update</Button>
                </FieldGroup>
                </FieldSet>
            </div>

        </div>
    )
}

export default Profile;