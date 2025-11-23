// OtpScreen.tsx
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';

const COUNTDOWN_SECONDS = 5 * 60; // 5 phút = 300s

const OtpScreen = () => {
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);

  // format dạng mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // chạy timer đếm ngược
  useEffect(() => {
    if (countdown <= 0) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  const handleFilled = (code: string) => {
    setOtp(code);
    Alert.alert('OTP', `Mã OTP: ${code}`);
  };

  const handleResendOtp = () => {
    if (countdown > 0) return;

    // TODO: call API resend OTP ở đây
    Alert.alert('OTP', 'Đã gửi lại mã OTP');

    // reset timer về 5 phút
    setCountdown(COUNTDOWN_SECONDS);
  };

  const canResend = countdown === 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nhập mã OTP</Text>
      <Text style={styles.subtitle}>
        Chúng tôi đã gửi mã xác thực đến số điện thoại của bạn
      </Text>

      <OtpInput
        numberOfDigits={6}
        autoFocus={true}
        type="numeric"
        focusColor="#4F46E5"
        onTextChange={(text) => setOtp(text)}
        onFilled={handleFilled}
        theme={{
          containerStyle: styles.otpContainer,
          pinCodeContainerStyle: styles.pinCodeContainer,
          focusedPinCodeContainerStyle: styles.focusedPinCodeContainer,
          filledPinCodeContainerStyle: styles.filledPinCodeContainer,
          disabledPinCodeContainerStyle: styles.disabledPinCodeContainer,
          pinCodeTextStyle: styles.pinCodeText,
          placeholderTextStyle: styles.placeholderText,
          focusStickStyle: styles.focusStick,
        }}
      />

      <Text style={styles.helperText}>OTP hiện tại: {otp || '-'}</Text>

      {/* Nút gửi lại OTP + countdown */}
      <TouchableOpacity
        onPress={handleResendOtp}
        disabled={!canResend}
        style={[styles.resendButton, !canResend && styles.resendButtonDisabled]}
        activeOpacity={0.7}
      >
        <Text
          style={[styles.resendText, !canResend && styles.resendTextDisabled]}
        >
          {canResend ? 'Gửi lại OTP' : `Gửi lại OTP (${formatTime(countdown)})`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#6B7280',
    marginBottom: 24,
  },
  otpContainer: {
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'center',
    gap: 12,
  },
  pinCodeContainer: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusedPinCodeContainer: {
    borderColor: '#4F46E5',
    backgroundColor: '#EEF2FF',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  filledPinCodeContainer: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  disabledPinCodeContainer: {
    backgroundColor: '#E5E7EB',
    borderColor: '#D1D5DB',
  },
  pinCodeText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  placeholderText: {
    fontSize: 20,
    color: '#9CA3AF',
  },
  focusStick: {
    width: 2,
    height: 24,
    borderRadius: 999,
    backgroundColor: '#4F46E5',
  },
  helperText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 13,
  },
  resendButton: {
    marginTop: 24,
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#4F46E5',
  },
  resendButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  resendText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  resendTextDisabled: {
    color: '#9CA3AF',
  },
});
