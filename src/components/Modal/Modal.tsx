import React from 'react';
import { ModalProps, StyleSheet, Modal, View } from 'react-native';

export interface IAppModalProps extends ModalProps {
}

const AppModal: React.FC<IAppModalProps> = ({ style, children, ...props }) => {

    return (
        <Modal {...props}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalView}>
                    {children}
                </View>
            </View>
        </Modal>
    )
}

export { AppModal };

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    modalView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 35,
        paddingVertical: 50,
        borderRadius: 18
    },
});
