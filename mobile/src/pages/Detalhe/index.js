import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Detalhe() {

    const navigation = useNavigation();
    const route = useRoute();
    const caso = route.params.caso;
    const message = `Olá, ${caso.name}, estou entrando em contato, pois gostaria de ajudar no caso "${caso.title}" com
    o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(caso.value)}`;

    function navigateBack() {
        navigation.goBack()
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${caso.title}`,
            recipients: [caso.email],
            body: message,
        })
    }

    function sendWpp() { 
        Linking.openURL(`whatsapp://send?phone=7${caso.whatsapp}?text=${message}`);
    }

    return ( 
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E82041" />
                </TouchableOpacity>
            </View>

            <View style={styles.caso}>
                <Text style={[styles.casoProperty], { marginTop: 0 }}>ONG:</Text>
                <Text style={styles.casoValue}>{caso.name} de {caso.city}/{caso.uf}</Text>

                <Text style={styles.casoProperty}>CASO:</Text>
                <Text style={styles.casoValue}>{caso.title}</Text>

                <Text style={styles.casoProperty}>VALOR:</Text>
                <Text style={styles.casoValue}>
                    {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(caso.value)}
                </Text>

            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
                <Text style={styles.heroDescription}>Entre em contato:</Text>
                <View style={styles.actions}>

                    <TouchableOpacity style={styles.action} onPress={sendWpp}>
                        <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>

                </View>

            </View>

        </View>
    );
}