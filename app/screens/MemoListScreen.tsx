import React, { FC, useState, useEffect, useCallback, memo } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
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
import { StackNavigationProp } from "@react-navigation/stack"
import Animated from "react-native-reanimated"
import { bInterpolate, useTimingTransition } from "react-native-redash"

type NavigationProp = StackNavigationProp<{ [x: string]: any }, "Main Screen">


type Props = {
    navigation: NavigationProp
}

export const MemoListView: FC<Props> = props => {
    const [deletionMode, setDeletionMode] = useState(false)
    const [memosToDelete, setMemosToDelete] = useState<string[]>([])
    const [isLocked, setLocked] = useState<boolean | undefined>(undefined)
    const dispatch = useDispatch()
    const memos = useSelector((state: AppState) => state.memos.memos)
    const settings = useSelector((state: AppState) => state.settings.settings)
    const transition = useTimingTransition(deletionMode, { duration: 150 })
    const opacity = bInterpolate(transition, 1, 0)
    const scale = bInterpolate(transition, 1, 0)
    const rotation = bInterpolate(transition, 0, Math.PI)
    const menuBarTranslateY = bInterpolate(transition, 50, 0)

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <Animated.View style={[styles.headerButton, { transform: [{ rotateZ: rotation }] }]}>
                    <IconButton
                        iconName="md-settings"
                        color={Color.onPrimary}
                        iconSize={30}
                        onPress={handleSettingsButtonPress}
                    />
                </Animated.View >
            ),
        });
    }, [isLocked]);

    useEffect(() => {
        StatusBar.setBackgroundColor(Color.statusBar)
        dispatch(loadMemos())
        dispatch(getSettings())
    }, [])

    useEffect(() => {
        if (settings) {
            setLocked(settings.memoListSecured)
        }
    }, [settings])

    const handleSettingsButtonPress = () => {
        if (isLocked === false) {
            props.navigation.navigate("Settings")
        }
    }

    const handleActionButtonPress = () => {
        !deletionMode && props.navigation.navigate("Preview Screen")
    }

    const handleDeleteMemo = useCallback((id: string) => {
        dispatch(removeMemo(id))
    }, [])


    const handleMemoItemPress = useCallback((id: string) => {
        const memo = memos!.find(memo => memo.id === id)
        props.navigation.push("Details Screen", { memo })
    }, [memos])

    const handleRenameMemo = useCallback((id: string, newName: string) => {
        dispatch(renameMemo(id, newName))
    }, [])

    const handleMemoItemLongPress = useCallback(() => {
        setDeletionMode(true)
    }, [])

    const handleMemoItemCheckChange = useCallback((id: string) => {
        const index = memosToDelete.findIndex(item => item === id)
        if (index !== -1) {
            setMemosToDelete([...memosToDelete.slice(0, index), ...memosToDelete.slice(index + 1)])
        }
        else {
            setMemosToDelete([...memosToDelete, id])
        }
    }, [])

    const cancelDeletionMode = () => {
        setDeletionMode(false)
    }

    const deleteMemos = () => {
        if (memosToDelete.length !== 0) {
            cancelDeletionMode()
            dispatch(removeMemos(memosToDelete))
        }
    }

    const handleUnlock = async () => {
        const authorized = await authorize("Authorize yourself to unlock memos")
        setLocked(!authorized)
    }

    if (isLocked === true) {
        return (
            <View style={styles.container}>
                <UnlockButton
                    animated={true}
                    onPress={handleUnlock}
                    color={Color.primary} />
            </View>
        )
    }

    return (
        <Loader isLoading={isLocked === undefined || memos === undefined} style={styles.container}>
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
        right: 20,
        bottom: 30
    },
    headerButton: {
        padding: 4,
        right: 20,
    },
    menuBar: {
        position: 'absolute',
        bottom: 0
    }
});
