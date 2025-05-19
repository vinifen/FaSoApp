import React from 'react'
import { useRoute } from '@react-navigation/core';
import useCheckParamId from 'shared/hooks/useCheckParamUserId';
import { CreatePosts } from 'shared/components/pages';

export default function _screen() {
  const route = useRoute();
  const { id } = route.params as { id: string };
  useCheckParamId(id);

  return (
    <CreatePosts/>
  )
}