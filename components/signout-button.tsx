'use client';
import { signOut } from 'next-auth/react';

export function SignOutButton() {
	function SignOutFunction() {
		signOut();
	}
	return <button onClick={SignOutFunction}>Sign Out</button>;
}
