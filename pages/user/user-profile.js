import React from "react";
import withAuth from "../../core/withAuth";
import UserProfile from "@/modules/auth/forms/userProfile";
import { useState } from "react";
import SkeletonUserProfile from "@/modules/skeleton/user/SkeletonUserProfile";

function userProfile({ dispatch }) {
  return <UserProfile />;
}

export default withAuth(userProfile);
