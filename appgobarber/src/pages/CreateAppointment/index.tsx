import React from 'react';
import { View, Text, Button } from 'react-native';

import { useAuth } from '../../hooks/auth';

const CreateAppointment: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <View>
      <Text>CreateAppointment</Text>
      <Button title="Sair" onPress={signOut} />
    </View>
  );
};

export default CreateAppointment;
