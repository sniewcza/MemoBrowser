import React, { FC, useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar, Dimensions, UIManager, LayoutAnimation, LayoutAnimationConfig, ActivityIndicator } from 'react-native';
import { ActionButton } from "../components/Buttons/ActionButton"
import { MemoList } from "../components/MemoList/MemoList"
import { useSelector, useDispatch } from "react-redux"
import { removeMemo, loadMemos, renameMemo, removeMemos, AppState, getSettings } from "../store"
import { Color } from "../config/ColorTheme"
import { DeletionBottomBar } from "../components/MenuBars/DeletionBottomBar"
import { IconButton } from '../components/Buttons/IconButton';
import { Loader } from '../components/Loaders/Loader';
import { UnlockButton } from '../components/Buttons/UnlockButton';
import { authorize } from "../api/LocalAuthService"
import Animated from "react-native-reanimated"
import { bInterpolate, useTimingTransition } from "react-native-redash"
const { Value } = Animated

const CustomlayoutAnimationConfig: LayoutAnimationConfig = {
    duration: 500,
    update: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity
    },
}


UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

export const MemoListView: FC = (props) => {
    const [deletionMode, setDeletionMode] = useState(false)
    const [memosToDelete, setMemosToDelete] = useState<string[]>([])
    const dispatch = useDispatch()
    const memos = useSelector((state: AppState) => state.memos.memos)
    const transition = useTimingTransition(deletionMode, { duration: 150 })
    const opacity = bInterpolate(transition, 1, 0)
    const scale = bInterpolate(transition, 1, 0)
    const menuBarTranslateY = bInterpolate(transition, 50, 0)
    useEffect(() => {
        dispatch(loadMemos())
    }, [])
    // const handleSettingsButtonPress = () => {
    //     if (!state.isLocked) {
    //         props.navigation.navigate("Settings")
    //     }
    // }

    const handleActionButtonPress = () => {
        !deletionMode && props.navigation.navigate("Preview Screen")
    }

    const handleDeleteMemo = (id: string) => {
        dispatch(removeMemo(id))
    }

    const handleMemoItemPress = (id: string) => {
        const memo = memos!.find(memo => memo.id === id)
        props.navigation.push("Details Screen", { memo })
    }

    const handleRenameMemo = (id: string, newName: string) => {
        dispatch(renameMemo(id, newName))
    }

    const handleMemoItemLongPress = () => {
        setDeletionMode(true)
    }

    const handleMemoItemCheckChange = (id: string) => {
        const index = memosToDelete.findIndex(item => item === id)
        if (index !== -1) {
            setMemosToDelete([...memosToDelete.slice(0, index), ...memosToDelete.slice(index + 1)])
        }
        else {
            setMemosToDelete([...memosToDelete, id])
        }
    }

    const cancelDeletionMode = () => {
        setDeletionMode(false)
    }

    const deleteMemos = () => {
        if (memosToDelete.length !== 0) {
            cancelDeletionMode()
            dispatch(removeMemos(memosToDelete))
        }
    }

    // const handleUnlock = async () => {
    //     setState({
    //         isLocked: !await authorize("Authorize yourself to unlock memos")
    //     })
    // }

    // if (state.isLocked) {
    //     return (
    //         <View style={styles.container}>
    //             <UnlockButton animated={true} onPress={handleUnlock}></UnlockButton>
    //         </View>
    //     )
    // }
    return (
        <Loader isLoading={false} style={styles.container}>
            <MemoList
                memos={memos!}
                onItemPress={handleMemoItemPress}
                onItemLongPress={handleMemoItemLongPress}
                onItemDelete={handleDeleteMemo}
                onItemRename={handleRenameMemo}
                onItemCheckChange={handleMemoItemCheckChange}
                deletionMode={deletionMode}
            />
            <Animated.View style={[styles.actionButton, { opacity, transform: [{ scale }] }]}>
                <ActionButton
                    backgroundColor={Color.secondary}
                    onPress={handleActionButtonPress}
                />
            </Animated.View>
            <Animated.View style={[styles.menuBar, { transform: [{ translateY: menuBarTranslateY }] }]}>
                <DeletionBottomBar onCancelPress={cancelDeletionMode} onDeletePress={deleteMemos} />
            </Animated.View>

        </Loader>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white"
    },
    actionButton: {
        position: 'absolute',
        right: 30,
        bottom: 30
    },
    headerButton: {
        padding: 4,
        marginRight: 20
    },
    menuBar: {
        position: 'absolute',
        bottom: 0
    }
});
