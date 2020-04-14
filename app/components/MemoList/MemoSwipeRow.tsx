import React, { FC, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableNativeFeedback,
  TextInput,
  Keyboard,
} from "react-native";
import SubMenuButton from "../Buttons/MemoListItemSubmenuButton";
import Icon from "react-native-vector-icons/Ionicons";
import { deleteMemoAlert } from "../Alerts/DeleteMemoAlert";
import { MemoListItem } from "./MemoListItem";
import { Memo } from "../../model";
import { Color } from "../../config/ColorTheme";

interface Props {
  memo: Memo;
  deletionMode: boolean;
  onDelete: (id: string) => any;
  onPress: (id: string) => any;
  onLongPress: () => any;
  onRename: (id: string, newName: string) => any;
  onCheck: (id: string) => any;
}

export const MemoSwipeRow: FC<Props> = (props) => {
  let row: SwipeRow | null;
  const [renameMode, setRenameMode] = useState<boolean>(false);
  const [checked, setChecked] = useState(false);
  const [memoName, setMemoName] = useState("");

  useEffect(() => {
    return () =>
      Keyboard.addListener("keyboardDidHide", keyboardDidHide).remove();
  }, []);

  useEffect(() => {
    closeRow();
    setChecked(false);
  }, [props.deletionMode]);

  const keyboardDidHide = () => {
    if (renameMode) {
      setRenameMode(false);
    }
  };

  const deleteMemo = () => {
    closeRow();
    deleteMemoAlert(() => {
      props.onDelete(props.memo.id);
    });
  };

  const onPress = () => {
    if (props.deletionMode) {
      setChecked(!checked);
      props.onCheck(props.memo.id);
    } else {
      closeRow();
      props.onPress(props.memo.id);
    }
  };

  const closeRow = () => {
    if (row) row._root.closeRow();
  };

  const renameMemo = () => {
    closeRow();
    setRenameMode(true);
  };

  const closeTextInput = () => {
    props.onRename(props.memo.id, memoName);
    setRenameMode(false);
  };

  const handleTextChange = (text: string) => {
    setMemoName(text);
  };

  const { deletionMode, onLongPress, memo } = props;
  return (
    <MemoListItem
      style={styles.listItem}
      name={memo.name}
      creationDate={memo.creationDate}
      photosCount={memo.photos.length}
      deletionMode={deletionMode}
      checked={checked}
      thumbnail={memo.photos[0].uri}
    />
  );
};

const styles = StyleSheet.create({
  swipeRow: {
    width: "100%",
    height: 56,
    paddingRight: 0, // override default swpieRow styles
    paddingTop: 0, // override default swpieRow styles
    paddingBottom: 0, // override default swpieRow styles
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  listItem: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    paddingRight: 5,
    alignItems: "center",
  },
  subMenu: {
    marginVertical: 1,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: Color.primary,
  },
  renameButton: {
    flex: 1,
    backgroundColor: Color.primary,
  },
});
