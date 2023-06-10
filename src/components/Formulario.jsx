import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-native-date-picker';

import { theme } from '../theme/colors';

export default function Formulario({
  modalVisible,
  setModalVisible,
  setPacientes,
  pacientes,
  paciente: pacienteObj,
}) {
  const [isEditing, setIsEditing] = useState(false); // Variable de estado para indicar si se está editando un paciente existente
  const [paciente, setPaciente] = useState({
    nombre: '',
    propietario: '',
    email: '',
    telefono: '',
    fecha: new Date(),
    sintomas: '',
  });

  const { fecha, sintomas, nombre, propietario, email, telefono, id } =
    paciente;

  useEffect(() => {
    if (Object.keys(pacienteObj).length > 0) {
      setIsEditing(true); // Se está editando un paciente existente
      setPaciente(pacienteObj);
    } else {
      setIsEditing(false); // Se está creando un nuevo paciente
      setPaciente({
        id: new Date().getTime().toString(),
        nombre: '',
        propietario: '',
        email: '',
        telefono: '',
        fecha: new Date(),
        sintomas: '',
      });
    }
  }, [pacienteObj]);

  const handleChange = (field, value) => {
    setPaciente(prevState => ({ ...prevState, [field]: value }));
  };

  const handleSubmit = () => {
    // Validate
    if (
      []
        .concat(nombre, propietario, email, telefono, fecha, sintomas)
        .includes('')
    ) {
      Alert.alert('Error!', 'Todos los campos son obligatorios', [
        { text: 'Aceptar' },
      ]);
      return;
    }

    if (isEditing) {
      // Actualizar paciente existente
      const updatedPacientes = pacientes.map(p =>
        p.id === paciente.id ? paciente : p,
      );
      setPacientes(updatedPacientes);
    } else {
      // Agregar nuevo paciente
      setPacientes([paciente, ...pacientes]);
    }

    // Reset
    setPaciente({
      id: '',
      nombre: '',
      propietario: '',
      email: '',
      telefono: '',
      fecha: new Date(),
      sintomas: '',
    });
    // Close Modal
    setModalVisible(false);
  };
  return (
    <Modal visible={modalVisible} animationType="slide">
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 5 : 0}>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.contenido}>
              <View style={styles.header}>
                <Text style={styles.title}>
                  {isEditing ? 'Editar Cita' : 'Nueva Cita'}
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.btnClose}>Cerrar</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Nombre del paciente"
                placeholderTextColor={theme.palette.text.secondary}
                value={nombre}
                onChangeText={value => handleChange('nombre', value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Nombre del propietario"
                placeholderTextColor={theme.palette.text.secondary}
                value={propietario}
                onChangeText={value => handleChange('propietario', value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor={theme.palette.text.secondary}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={value => handleChange('email', value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Teléfono"
                placeholderTextColor={theme.palette.text.secondary}
                keyboardType="phone-pad"
                maxLength={9}
                value={telefono}
                onChangeText={value => handleChange('telefono', value)}
              />
              <View style={styles.datePickerContainer}>
                <DatePicker
                  date={fecha}
                  locale="es"
                  mode="date"
                  onDateChange={value => handleChange('fecha', value)}
                />
              </View>
              <TextInput
                style={{ ...styles.input, height: 100 }}
                placeholder="Síntomas"
                multiline={true}
                placeholderTextColor={theme.palette.text.secondary}
                value={sintomas}
                onChangeText={value => handleChange('sintomas', value)}
              />

              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.5}
                onPress={handleSubmit}>
                <Text style={styles.buttonText}>
                  {isEditing ? 'Guardar Cambios' : 'Agregar'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.palette.background.primary,
  },
  contenido: {
    marginHorizontal: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  btnClose: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.palette.primary.main,
  },
  input: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.palette.background.secondary,
    borderRadius: theme.spacing.xs,
    color: theme.palette.text.primary,
    borderColor: theme.palette.text.secondary,
    borderWidth: 0.5,
  },
  datePickerContainer: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.palette.text.secondary,
    borderRadius: theme.spacing.xs,
    overflow: 'hidden',
  },
  button: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.palette.accent.main,
    borderRadius: theme.spacing.md,
  },
  buttonText: {
    color: theme.palette.primary.contrastText,
    textAlign: 'center',
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: 18,
  },
});
