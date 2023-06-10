import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { theme } from './src/theme/colors';
import Formulario from './src/components/Formulario';
import Paciente from './src/components/Paciente';
import InfoPaciente from './src/components/InfoPaciente';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});
  const [modalPaciente, setModalPaciente] = useState(false);

  const pacienteEdit = id => {
    setModalVisible(!modalVisible);
    const pacienteEditar = pacientes.find(p => p.id === id);
    if (pacienteEditar) {
      setPaciente(pacienteEditar);
    } else {
      setPaciente({});
    }
  };

  const deletePaciente = id => {
    const pacientesActualizados = pacientes.filter(p => p.id !== id);
    setPacientes(pacientesActualizados);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Administrador de Pacientes de{' '}
        <Text style={styles.subtitle}>Veterinaria</Text>
      </Text>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.5}
        onPress={() => {
          setPaciente({});
          setModalVisible(!modalVisible);
        }}>
        <Text style={styles.buttonText}>Nueva Cita</Text>
      </TouchableOpacity>

      {/* Mostrar los pacientes */}
      {pacientes.length === 0 ? (
        <Text style={styles.noPacientes}>No hay pacientes agregados</Text>
      ) : (
        <FlatList
          data={pacientes}
          keyExtractor={item => `${item.id}-${item.nombre}`}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Paciente
              paciente={item}
              setModalVisible={setModalVisible}
              setPaciente={setPaciente}
              pacienteEdit={pacienteEdit}
              deletePaciente={deletePaciente}
              setModalPaciente={setModalPaciente}
            />
          )}
        />
      )}

      <Formulario
        modalVisible={modalVisible}
        pacientes={pacientes}
        setModalVisible={setModalVisible}
        setPacientes={setPacientes}
        paciente={paciente}
      />

      <Modal animationType="slide" visible={modalPaciente}>
        <InfoPaciente paciente={paciente} setModalPaciente={setModalPaciente} />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.palette.background.primary,
  },
  title: {
    fontSize: 28,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeight.black,
  },
  button: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: theme.spacing.md,
    marginHorizontal: theme.spacing.lg,
  },
  buttonText: {
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  noPacientes: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: 16,
    marginVertical: theme.spacing.md,
    marginHorizontal: theme.spacing.lg,
    textTransform: 'uppercase',
  },
});
