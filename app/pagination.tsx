import BasicPagination from '@cherry-soft/react-native-basic-pagination';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const PaginationExample = () => {
  const [page, setPage] = React.useState(1);

  return (
    <View style={styles.wrapper}>
      <BasicPagination
        totalItems={100}
        currentPage={page}
        onPageChange={(p) => setPage(p)}
        pageSize={10}
        pagesToDisplay={5}
        containerStyle={styles.container}
        btnStyle={styles.btn}
        textStyle={styles.text}
        activeBtnStyle={styles.activeBtn}
        activeTextStyle={styles.activeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 20,
    alignItems: 'center',
  },

  container: {
    flexDirection: 'row',
    gap: 8,
    padding: 6,
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
  },

  btn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ddd',
  },

  text: {
    fontSize: 14,
    color: '#333',
  },

  activeBtn: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },

  activeText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default PaginationExample;
