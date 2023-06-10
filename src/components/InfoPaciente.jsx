import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../theme/colors';
import { formattedDate } from '../helpers';

export default function InfoPaciente({ paciente, setModalPaciente }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Información del paciente</Text>
        <TouchableOpacity onPress={() => setModalPaciente(false)}>
          <Text style={styles.btnClose}>Cerrar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <View style={styles.row}>
          <Text style={styles.label}>Paciente:</Text>
          <Text style={styles.text}>{paciente.nombre}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.text}>{paciente.email}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Teléfono:</Text>
          <Text style={styles.text}>{paciente.telefono}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Fecha:</Text>
          <Text style={styles.text}>{formattedDate(paciente.fecha)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Síntomas:</Text>
          <Text style={styles.text}>{paciente.sintomas}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.border,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.palette.text.primary,
  },
  btnClose: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    fontSize: 16,
  },
  body: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 8,
  },
  text: {
    color: theme.palette.text.primary,
    fontSize: 16,
  },
});
