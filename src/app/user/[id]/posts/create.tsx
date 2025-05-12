import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/core';
import useCheckParamId from 'shared/hooks/useCheckParamId';
import CreatePost from 'shared/components/pages/posts/CreatePost';

export default function _screen() {
  const route = useRoute();
  const { id } = route.params as { id: string };
  useCheckParamId(id);
  return (
    <CreatePost/>
  )
}