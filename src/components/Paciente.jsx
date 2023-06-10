import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Pressable,
} from 'react-native';
import React from 'react';

import { theme } from '../theme/colors';
import { formattedDate } from '../helpers';

export default function Paciente({
  paciente,
  pacienteEdit,
  deletePaciente,
  setModalPaciente,
  setPaciente,
}) {
  const { nombre, fecha, id } = paciente;

  const handleEdit = () => {
    pacienteEdit(id);
  };

  const handleDelete = () => {
    Alert.alert(
      'Eliminar paciente',
      '¿Estás seguro de que quieres eliminar este paciente?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => deletePaciente(id),
        },
      ],
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        setModalPaciente(true), setPaciente(paciente);
      }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.nombre}>{nombre}</Text>
          <Text style={styles.date}>{formattedDate(fecha)}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonEdit]}
            activeOpacity={0.5}
            onPress={handleEdit}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonDelete]}
            activeOpacity={0.5}
            onPress={handleDelete}>
            <Text style={styles.buttonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacing.md,
    marginHorizontal: theme.spacing.lg,
    backgroundColor: theme.palette.background.secondary,
    padding: theme.spacing.md,
    borderRadius: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nombre: {
    fontSize: 18,
    color: theme.palette.text.primary,
    fontWeight: '600',
  },
  date: {
    fontSize: 18,
    color: theme.palette.text.secondary,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: theme.spacing.sm,
  },
  button: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.spacing.md,
    marginLeft: theme.spacing.md,
  },
  buttonEdit: {
    backgroundColor: theme.palette.primary.main,
  },
  buttonDelete: {
    backgroundColor: theme.palette.accent.main,
  },
  buttonText: {
    color: theme.palette.secondary.contrastText,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
