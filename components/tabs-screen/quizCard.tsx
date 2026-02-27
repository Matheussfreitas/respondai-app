import { Image, ImageSourcePropType, Text, View } from 'react-native';

interface QuizCardProps {
  title: string;
  description: string;
  level: string;
  questionsCount: number;
  imageUrl: ImageSourcePropType;
}

export default function QuizCard({
  title,
  description,
  level,
  questionsCount,
  imageUrl,
}: QuizCardProps) {
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 12,
        marginBottom: 16,
        elevation: 4,
      }}
    >
      <Image
        source={imageUrl}
        style={{ width: '100%', height: 140, borderRadius: 12, }}
        resizeMode="cover"
      />

      <Text style={{ fontWeight: '600', fontSize: 16, marginTop: 10 }}>
        {title}
      </Text>

      <Text
        numberOfLines={2}
        style={{ marginTop: 6, fontSize: 13, color: '#666' }}
      >
        {description}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 12,
          alignItems: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: '#EEF2FF',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 8,
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: '500' }}>{level}</Text>
        </View>

        <Text style={{ fontSize: 12, color: '#888' }}>{questionsCount} questões</Text>
      </View>
    </View>
  );
}
